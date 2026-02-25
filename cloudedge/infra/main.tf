data "digitalocean_ssh_key" "default" {
  name = var.ssh_key_name
}

resource "digitalocean_droplet" "vm" {
  name   = var.droplet_name
  region = var.region
  size   = var.droplet_size
  image  = var.image

  ssh_keys = [data.digitalocean_ssh_key.default.id]
}
