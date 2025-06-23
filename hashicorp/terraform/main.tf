terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# S3 bucket for landing site
resource "aws_s3_bucket" "landing" {
  bucket = var.landing_bucket
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  versioning {
    enabled = true
  }

  policy = data.aws_iam_policy_document.landing_site.json
}

data "aws_iam_policy_document" "landing_site" {
  statement {
    actions = ["s3:GetObject"]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    resources = ["${aws_s3_bucket.landing.arn}/*"]
  }
}

# S3 bucket for database backups
resource "aws_s3_bucket" "backups" {
  bucket = var.backup_bucket
  acl    = "private"
  versioning {
    enabled = true
  }
}

output "landing_bucket_name" {
  value = aws_s3_bucket.landing.bucket
}

output "backup_bucket_name" {
  value = aws_s3_bucket.backups.bucket
}
