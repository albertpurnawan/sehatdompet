package handlers

import (
  "encoding/json"
  "net/http"
)

func RecoToday(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode([]map[string]any{
    {
      "id": "rec-1",
      "title": "Gula mingguan 230g (↑30%)",
      "subtitle": "5x minuman manis, 2x es kopi susu",
      "type": "health",
      "priority": 80,
      "insight": map[string]any{
        "period": "2025-10-20..2025-10-26",
        "impact_preview": map[string]any{"sugar_g_delta": -420, "cost_delta": -80000},
      },
      "actions": []map[string]any{
        {"id":"target","label":"Target <2x/minggu","payload": map[string]any{"limit":2}},
        {"id":"swap","label":"Lihat alternatif","payload": map[string]any{"category":"minuman rendah gula"}},
        {"id":"snooze","label":"Snooze 7 hari","payload": map[string]any{"days":7}},
      },
    },
  })
}

