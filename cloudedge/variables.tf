variable "do_token" {
  type      = string
  sensitive = true
}

variable "region" {
  type    = string
  default = "sgp1"
}

variable "droplet_name" {
  type    = string
  default = "tf-demo-vm"
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
