export interface Logo {
  id: string;
  name: string;
  ariaLabel: string;
  src: string;
}

export const logos: Logo[] = [
  { id: "cplusplus", name: "C++", ariaLabel: "C++", src: "/logos/cplusplus.svg" },
  { id: "python", name: "Python", ariaLabel: "Python", src: "/logos/python.svg" },
  { id: "docker", name: "Docker", ariaLabel: "Docker", src: "/logos/docker.svg" },
  { id: "terraform", name: "Terraform", ariaLabel: "Terraform", src: "/logos/terraform.svg" },
  { id: "ansible", name: "Ansible", ariaLabel: "Ansible", src: "/logos/ansible.svg" },
  { id: "githubactions", name: "GitHub Actions", ariaLabel: "GitHub Actions", src: "/logos/githubactions.svg" },
  { id: "linux", name: "Linux", ariaLabel: "Linux", src: "/logos/linux.svg" },
  { id: "bash", name: "Bash", ariaLabel: "Bash", src: "/logos/gnubash.svg" },
  { id: "windows", name: "Windows Server", ariaLabel: "Windows Server", src: "/logos/windows.svg" },
  { id: "git", name: "Git", ariaLabel: "Git", src: "/logos/git.svg" },
];
