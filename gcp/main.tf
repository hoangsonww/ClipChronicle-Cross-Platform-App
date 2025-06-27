terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Static site bucket
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

# Make the bucket publicly readable
resource "google_storage_bucket_iam_binding" "public" {
  bucket = google_storage_bucket.landing.name
  role   = "roles/storage.objectViewer"
  members = [
    "allUsers",
  ]
}
