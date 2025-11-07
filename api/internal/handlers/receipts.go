package handlers

import (
  "encoding/json"
  "net/http"
  "strings"
)

func ReceiptsList(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode([]map[string]any{{"id":"r1","merchant":"Alfamart","total":59900}})
}

func ReceiptDetail(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type", "application/json")
  // Expect path: /v1/receipts/{id}
  parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/v1/receipts/"), "/")
  id := ""
  if len(parts) > 0 { id = parts[0] }
  if id == "" { http.Error(w, "not found", http.StatusNotFound); return }
  json.NewEncoder(w).Encode(map[string]any{
    "id": id,
    "merchant": "Alfamart",
    "ts": "2025-10-25T19:21:00+07:00",
    "total": 59900,
    "items": []map[string]any{
      {"raw_name":"SUSU UHT FULL CREAM 1L","qty":1,"unit_price":22500,"category":"dairy"},
      {"raw_name":"MIE INST GORENG","qty":2,"unit_price":7000,"category":"instant_food"},
      {"raw_name":"GULA PASIR 1kg","qty":1,"unit_price":16900,"category":"pantry"},
      {"raw_name":"BAYAM 250g","qty":1,"unit_price":6500,"category":"vegetable"},
    },
  })
}

func ReceiptUpload(w http.ResponseWriter, r *http.Request){
  if r.Method != http.MethodPost { http.Error(w, "method not allowed", http.StatusMethodNotAllowed); return }
  if err := r.ParseMultipartForm(10<<20); err != nil { http.Error(w, "bad form", http.StatusBadRequest); return }
  _, _, err := r.FormFile("file"); if err != nil { http.Error(w, "file missing", http.StatusBadRequest); return }
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]string{"job_id":"mock-job-123", "receipt_id":"r1"})
}
