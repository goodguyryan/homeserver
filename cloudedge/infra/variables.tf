variable "do_token" {
  type      = string
  sensitive = true
}

variable "region" {
  type    = string
  default = "sgp1"
}

variable "ssh_key_name" {
  type        = string
  description = "Name of the SSH key as it appears in your DigitalOcean account"
}

variable "droplet_size" {
  type    = string
  default = "s-1vcpu-1gb"
}

variable "image" {
  type    = string
  default = "ubuntu-22-04-x64"
}

variable "droplets" {
  type = map(object({
    name   = string
    size   = optional(string)
    region = optional(string)
    image  = optional(string)
  }))
  default = {
    "vm1" = { name = "tf-demo-vm" }
    "vm2" = { name = "test-hermes" }
  }
}