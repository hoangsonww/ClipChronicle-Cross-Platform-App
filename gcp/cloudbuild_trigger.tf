resource "google_cloudbuild_trigger" "landing" {
  name        = "deploy-landing-page"
  description = "Build & deploy landing page on push"

  github {
    owner = split("/", var.github_repo_name)[0]
    name  = split("/", var.github_repo_name)[1]
    push {
      branch = var.github_branch
    }
  }

  filename = "gcp/cloudbuild.yaml"
}
