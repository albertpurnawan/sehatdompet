package handlers

import (
  "encoding/json"
  "net/http"
  "strings"
)

func RecoAction(w http.ResponseWriter, r *http.Request){
  if r.Method != http.MethodPost { http.Error(w, "method not allowed", http.StatusMethodNotAllowed); return }
  // /v1/reco/{id}/action
  parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/v1/reco/"), "/")
  if len(parts) < 2 || parts[1] != "action" { http.Error(w, "bad path", http.StatusBadRequest); return }
  id := parts[0]
  var body struct{ Id string; Action string; Payload map[string]any }
  json.NewDecoder(r.Body).Decode(&body)
  _ = id
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]any{"ok": true})
}

