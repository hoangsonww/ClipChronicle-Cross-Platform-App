resource "google_storage_bucket" "landing" {
  name                        = var.bucket_name
  location                    = var.region
  force_destroy               = true
  uniform_bucket_level_access = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

# Public read access
resource "google_storage_bucket_iam_binding" "public" {
  bucket = google_storage_bucket.landing.name
  role   = "roles/storage.objectViewer"
  members = [
    "allUsers",
  ]
}
