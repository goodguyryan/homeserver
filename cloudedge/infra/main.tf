data "digitalocean_ssh_key" "default" {
  name = var.ssh_key_name
}

locals {
  droplet_configs = { for k, v in var.droplets : k => {
    name   = v.name
    size   = coalesce(v.size, var.droplet_size)
    region = coalesce(v.region, var.region)
    image  = coalesce(v.image, var.image)
  }}
}

resource "digitalocean_droplet" "vm" {
  for_each = local.droplet_configs

  name     = each.value.name
  region   = each.value.region
  size     = each.value.size
  image    = each.value.image
  ssh_keys = [data.digitalocean_ssh_key.default.id]
}