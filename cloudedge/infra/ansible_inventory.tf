resource "local_file" "ansible_inventory" {
  filename = "../configure/inventory.yml"

  content = yamlencode({
    all = {
      hosts = {
        for key, droplet in digitalocean_droplet.vm : key => {
          ansible_host                 = droplet.ipv4_address
          ansible_user                 = "root"
          ansible_ssh_private_key_file = "~/.ssh/terraform"
        }
        if key == "vm1"
      }
    }
  })
}
