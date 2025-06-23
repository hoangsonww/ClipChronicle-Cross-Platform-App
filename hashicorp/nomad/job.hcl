job "landing" {
  datacenters = ["dc1"]
  type        = "service"

  group "web" {
    count = 1

    network {
      port "http" {
        static = 8080
      }
    }

    task "nginx" {
      driver = "docker"
      config {
        image = "nginx:stable-alpine"
        ports = ["http"]
      }

      artifact {
        source      = "s3::https://clipchronicle-landing.s3.amazonaws.com/index.html"
        destination = "local/index.html"
      }

      template {
        data        = <<EOF
server {
  listen 8080;
  root /local;
  index index.html;
}
EOF
        destination = "local/default.conf"
      }

      resources {
        cpu    = 500
        memory = 256
      }
    }
  }
}
