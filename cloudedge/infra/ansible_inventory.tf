resource "local_file" "ansible_inventory" {
  filename = "../configure/inventory.yml"

  content = yamlencode({
    all = {
      hosts = {
        vm = {
          ansible_host                 = digitalocean_droplet.vm.ipv4_address
          ansible_user                 = "root"
          ansible_ssh_private_key_file = "/home/user/.ssh/terraform"
        }
      }
    }
  })
}
