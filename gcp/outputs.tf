output "bucket_name" {
  description = "GCS bucket name"
  value       = google_storage_bucket.landing.name
}

output "site_url" {
  description = "Public URL of the static site"
  value       = "https://${google_storage_bucket.landing.name}.storage.googleapis.com"
}

output "cloudbuild_trigger_id" {
  description = "ID of the Cloud Build trigger"
  value       = google_cloudbuild_trigger.landing.id
}
