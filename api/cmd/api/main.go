package main

import (
  "log"
  "net/http"
  "os"
  "time"
  "sehatdompet/api/internal/handlers"
)

func main(){
  mux := http.NewServeMux()

  // Public auth endpoints
  mux.HandleFunc("/v1/auth/register", handlers.Register)
  mux.HandleFunc("/v1/auth/login", handlers.Login)

  // Protected endpoints (use simple wrapper for now)
  mux.Handle("/v1/auth/me", handlers.WithAuth(http.HandlerFunc(handlers.Me)))
  mux.Handle("/v1/receipts", handlers.WithAuth(http.HandlerFunc(handlers.ReceiptsList)))
  mux.Handle("/v1/receipts/", handlers.WithAuth(http.HandlerFunc(handlers.ReceiptDetail)))
  mux.Handle("/v1/receipts:upload", handlers.WithAuth(http.HandlerFunc(handlers.ReceiptUpload)))
  mux.Handle("/v1/insights/finance", handlers.WithAuth(http.HandlerFunc(handlers.InsightsFinance)))
  mux.Handle("/v1/insights/health", handlers.WithAuth(http.HandlerFunc(handlers.InsightsHealth)))
  mux.Handle("/v1/budgets", handlers.WithAuth(http.HandlerFunc(handlers.Budgets)))
  mux.Handle("/v1/reco/today", handlers.WithAuth(http.HandlerFunc(handlers.RecoToday)))
  mux.Handle("/v1/reco/", handlers.WithAuth(http.HandlerFunc(handlers.RecoAction)))

  srv := &http.Server{
    Addr:         ":8080",
    Handler:      logRequest(mux),
    ReadTimeout:  15 * time.Second,
    WriteTimeout: 15 * time.Second,
    IdleTimeout:  60 * time.Second,
  }

  log.Println("API listening on", srv.Addr)
  if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
    log.Println("server error:", err)
    os.Exit(1)
  }
}

func logRequest(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
    log.Printf("%s %s", r.Method, r.URL.Path)
    next.ServeHTTP(w, r)
  })
}
