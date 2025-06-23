data_dir  = "/nomad/data"
bind_addr = "0.0.0.0"

server {
  enabled          = true
  bootstrap_expect = 1
}

client {
  enabled       = true
  network_speed = 100
}

consul {
  address = "127.0.0.1:8500"
}
