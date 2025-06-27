# GCP Static Hosting for ClipChronicle Landing Page

This folder contains Terraform and Cloud Build configs to host your `landing/` React site on a public GCS bucket.

## Prerequisites

- [gcloud SDK](https://cloud.google.com/sdk) installed & authenticated  
- Terraform v1.0+  
- A GCP project with billing enabled  

## 1. Provision with Terraform

```bash
cd gcp
terraform init
terraform apply \
  -var project_id=YOUR_PROJECT_ID \
  -var bucket_name=your-unique-landing-bucket \
  -var region=US
```

After apply, note the outputs:

* `bucket_name` → the name of your GCS bucket
* `site_url` (formerly `static_url`) → `https://<bucket>.storage.googleapis.com`

> [!TIP]
> If you later change the bucket name or region, re-run `terraform apply` to update.

## 2. Configure Cloud Build

1. In **Cloud Build → Triggers**, click **Create trigger**
2. Select **Event** = “Push to a branch”
3. Authorize your GitHub repo and then choose:

  * **Branch**: `^main$` (or whichever branch you prefer)
  * **Build configuration**: “Cloud Build configuration file (yaml or json)”
  * **Cloud Build configuration file location**: `gcp/cloudbuild.yaml`
4. Under **Substitution variables**, add:

  * `_BUCKET` = `your-unique-landing-bucket`
  * `_LAYER_DIR` = `landing`
5. Save the trigger.

Now every push to that branch will:

1. `npm ci` in `landing/`
2. `npm run build` → generates `landing/build/`
3. `gsutil -m rsync -r landing/build/ gs://your-unique-landing-bucket`

## 3. Verify

* Open the **site\_url** (from your Terraform outputs) in a browser
* You should see your fully deployed Next.js landing page

---

That’s it! You now have an end-to-end, Git-driven CI/CD pipeline on GCP serving your React static site from a public bucket. 🎉
