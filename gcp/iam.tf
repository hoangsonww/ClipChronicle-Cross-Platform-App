# The default Cloud Build SA: PROJECT_NUMBER@cloudbuild.gserviceaccount.com
data "google_project" "project" {}

locals {
  cloudbuild_sa = "${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_storage_bucket_iam_member" "cloudbuild_writer" {
  bucket = google_storage_bucket.landing.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${local.cloudbuild_sa}"
}

# Optional: allow your own user to administer the bucket
resource "google_storage_bucket_iam_member" "user_admin" {
  bucket = google_storage_bucket.landing.name
  role   = "roles/storage.admin"
  member = "user:YOUR_EMAIL@domain.com"  # <-- replace with your email
}
