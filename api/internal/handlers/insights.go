package handlers

import (
  "encoding/json"
  "net/http"
)

func InsightsFinance(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]any{
    "total": 3400000,
    "top_categories": []string{"makanan","transport"},
    "top_merchants": []string{"Alfamart","Kopi Kenangan"},
    "anomalies": []map[string]any{{"label":"Kopi","delta_pct":48}},
  })
}

func InsightsHealth(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]any{
    "score": 78,
    "sugar_g": 230,
    "upf_pct": 0.4,
    "sodium_g": 1.8,
    "drivers": []map[string]any{{"merchant":"Kopi Kenangan","count":2}},
  })
}

func Budgets(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode([]map[string]any{{"category":"makanan","limit":1500000,"actual":1250000}})
}

