variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region (for multi-regional buckets)"
  type        = string
  default     = "US"
}

variable "bucket_name" {
  description = "Name of the GCS bucket to host the static site"
  type        = string
}

variable "github_repo_name" {
  description = "GitHub repo name in format org/repo (for Cloud Build trigger)"
  type        = string
}

variable "github_branch" {
  description = "Branch to watch for auto-deploy"
  type        = string
  default     = "main"
}
