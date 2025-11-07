# SehatDompet — MVP Skeleton

Asisten pribadi berbasis pengeluaran yang menghubungkan keuangan ↔ kesehatan ↔ hobi ↔ pendidikan ↔ life admin lewat struk/e‑receipt/mutasi. Dokumen acuan: `asisten_pribadi_berbasis_pengeluaran_rencana_eksekusi_mvp_8_10_minggu.md` dan `ui_brief.md`.

## Struktur Proyek
- `design/` — design tokens (dark-first)
- `mobile/` — komponen RN siap pakai (Cards, ProgressRing, List) + screens sesuai wireframes
- `api/` — server Go (stdlib http) stub endpoint v1
- `db/migrations/` — skema PostgreSQL sesuai brief
- `workers/` — placeholder pipelines (ocr/parse/match/nutrition/insight/notify)
- `docker-compose.yml` — Postgres + API + (opsional) MinIO/NATS

## Jalur MVP (8–10 Minggu)
1. Sprint 1: Ingest struk, OCR/parse, klasifikasi, dashboard dasar
2. Sprint 2: Nutrition flags + Health Score, Autobudget + anomali
3. Sprint 3: Copilot Q&A kecil + kartu rekomendasi + notifikasi
4. Sprint 4: Goals, kill‑list, edukasi, pilot B2B

## Menjalankan API Lokal
- `cd api && go run main.go` (port 8080)
- Endpoint contoh: `GET /v1/insights/finance?month=2025-10`

## Integrasi Mobile
- Gunakan komponen di `mobile/src` pada app RN/Expo Anda.
- Tambahkan dependensi: `react-native-svg` (ProgressRing). Jika Expo: `expo install react-native-svg`.
- Ikuti tokens di `design/tokens.json`.

## Catatan
- Server Go menggunakan stdlib `net/http` agar tanpa dependensi; bisa dipindah ke Gin/Fiber nanti.
- Migrations SQL sesuai brief; tambahkan migrator (golang-migrate) saat deploy.

# sehatdompet
