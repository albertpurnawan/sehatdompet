package handlers

import (
  "encoding/json"
  "net/http"
)

func Register(w http.ResponseWriter, r *http.Request){
  w.WriteHeader(http.StatusCreated)
}

func Login(w http.ResponseWriter, r *http.Request){
  // return mock JWT
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]string{"access_token":"mock.jwt.token"})
}

func Me(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(map[string]any{"id":"user-1","email":"demo@local"})
}

func WithAuth(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
    if r.Header.Get("Authorization") == "" { http.Error(w, "unauthorized", http.StatusUnauthorized); return }
    next.ServeHTTP(w, r)
  })
}

