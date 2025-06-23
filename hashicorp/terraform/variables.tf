variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "landing_bucket" {
  description = "S3 bucket name for the landing site"
  type        = string
}

variable "backup_bucket" {
  description = "S3 bucket name for database backups"
  type        = string
}
