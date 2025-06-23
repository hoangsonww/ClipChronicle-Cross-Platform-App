output "landing_bucket_website_endpoint" {
  value = aws_s3_bucket.landing.website_endpoint
}

output "backups_bucket_arn" {
  value = aws_s3_bucket.backups.arn
}
