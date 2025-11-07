package handlers

import (
    "bytes"
    "encoding/json"
    "mime/multipart"
    "net/http"
    "net/http/httptest"
    "strings"
    "testing"
)

func TestRegisterCreated(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/v1/auth/register", nil)
    Register(rr, req)
    if rr.Code != http.StatusCreated {
        t.Fatalf("expected 201, got %d", rr.Code)
    }
}

func TestLoginReturnsToken(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/v1/auth/login", strings.NewReader(`{"email":"demo@local","password":"password"}`))
    Login(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var body map[string]string
    if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if body["access_token"] == "" {
        t.Fatalf("expected access_token, got empty")
    }
}

func TestWithAuthUnauthorized(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/secure", nil)
    // No Authorization header
    WithAuth(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })).ServeHTTP(rr, req)
    if rr.Code != http.StatusUnauthorized {
        t.Fatalf("expected 401, got %d", rr.Code)
    }
}

func TestMeAuthorized(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/auth/me", nil)
    req.Header.Set("Authorization", "Bearer mock")
    WithAuth(http.HandlerFunc(Me)).ServeHTTP(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var body map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if body["id"] == nil || body["email"] == nil {
        t.Fatalf("expected id and email fields")
    }
}

func TestReceiptsList(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/receipts", nil)
    ReceiptsList(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var arr []map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &arr); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if len(arr) == 0 {
        t.Fatalf("expected non-empty receipts list")
    }
}

func TestReceiptDetailOK(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/receipts/r1", nil)
    ReceiptDetail(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var body map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if body["id"] != "r1" {
        t.Fatalf("expected id r1, got %v", body["id"])
    }
}

func TestReceiptDetailNotFound(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/receipts/", nil)
    ReceiptDetail(rr, req)
    if rr.Code != http.StatusNotFound {
        t.Fatalf("expected 404, got %d", rr.Code)
    }
}

func TestReceiptUploadMethodNotAllowed(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/receipts:upload", nil)
    ReceiptUpload(rr, req)
    if rr.Code != http.StatusMethodNotAllowed {
        t.Fatalf("expected 405, got %d", rr.Code)
    }
}

func TestReceiptUploadMissingFile(t *testing.T) {
    var buf bytes.Buffer
    writer := multipart.NewWriter(&buf)
    // no file part
    writer.Close()
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/v1/receipts:upload", &buf)
    req.Header.Set("Content-Type", writer.FormDataContentType())
    ReceiptUpload(rr, req)
    if rr.Code != http.StatusBadRequest {
        t.Fatalf("expected 400, got %d", rr.Code)
    }
}

func TestReceiptUploadOK(t *testing.T) {
    var buf bytes.Buffer
    writer := multipart.NewWriter(&buf)
    part, err := writer.CreateFormFile("file", "receipt.jpg")
    if err != nil { t.Fatalf("create form file error: %v", err) }
    part.Write([]byte("dummy"))
    writer.Close()

    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/v1/receipts:upload", &buf)
    req.Header.Set("Content-Type", writer.FormDataContentType())
    ReceiptUpload(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var body map[string]string
    if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if body["job_id"] == "" || body["receipt_id"] == "" {
        t.Fatalf("expected job_id and receipt_id in response")
    }
}

func TestRecoToday(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/reco/today", nil)
    RecoToday(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var arr []map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &arr); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if len(arr) == 0 || arr[0]["id"] == nil {
        t.Fatalf("expected at least one recommendation with id")
    }
}

func TestRecoActionBadPath(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/v1/reco/abc/wrong", strings.NewReader(`{"id":"abc"}`))
    RecoAction(rr, req)
    if rr.Code != http.StatusBadRequest {
        t.Fatalf("expected 400, got %d", rr.Code)
    }
}

func TestRecoActionOK(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodPost, "/v1/reco/abc/action", strings.NewReader(`{"id":"abc","action":"target"}`))
    RecoAction(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var body map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if body["ok"] != true {
        t.Fatalf("expected ok true")
    }
}

func TestInsightsFinance(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/insights/finance", nil)
    InsightsFinance(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var body map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if body["total"] == nil || body["top_categories"] == nil {
        t.Fatalf("expected finance fields present")
    }
}

func TestInsightsHealth(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/insights/health", nil)
    InsightsHealth(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var body map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &body); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if body["score"] == nil || body["sugar_g"] == nil {
        t.Fatalf("expected health fields present")
    }
}

func TestBudgets(t *testing.T) {
    rr := httptest.NewRecorder()
    req := httptest.NewRequest(http.MethodGet, "/v1/budgets", nil)
    Budgets(rr, req)
    if rr.Code != http.StatusOK {
        t.Fatalf("expected 200, got %d", rr.Code)
    }
    var arr []map[string]any
    if err := json.Unmarshal(rr.Body.Bytes(), &arr); err != nil {
        t.Fatalf("bad json: %v", err)
    }
    if len(arr) == 0 || arr[0]["category"] == nil {
        t.Fatalf("expected budgets with category field")
    }
}

