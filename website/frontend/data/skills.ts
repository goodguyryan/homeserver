export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "C", icon: "/logos/c.svg" },
      { name: "C++", icon: "/logos/cplusplus.svg" },
      { name: "Python", icon: "/logos/python.svg" },
      { name: "TypeScript", icon: "/logos/typescript.svg" },
      { name: "JavaScript", icon: "/logos/javascript.svg" },
      { name: "Java", icon: "/logos/java.svg" },
      { name: "SQL", icon: "/logos/sql.svg" },
      { name: "Verilog", icon: "/logos/verilog.svg" },
    ],
  },
  {
    category: "Full-Stack",
    items: [
      { name: "React", icon: "/logos/react.svg" },
      { name: "Next.js", icon: "/logos/nextdotjs.svg" },
      { name: "Express", icon: "/logos/express.svg" },
      { name: "Node.js", icon: "/logos/nodedotjs.svg" },
      { name: "Flask", icon: "/logos/flask.svg" },
      { name: "PostgreSQL", icon: "/logos/postgresql.svg" },
      { name: "Supabase", icon: "/logos/supabase.svg" },
      { name: "HTML/CSS", icon: "/logos/htmlcss.svg" },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    items: [
      { name: "Docker", icon: "/logos/docker.svg" },
      { name: "Terraform", icon: "/logos/terraform.svg" },
      { name: "Ansible", icon: "/logos/ansible.svg" },
      { name: "GitHub Actions", icon: "/logos/githubactions.svg" },
      { name: "Linux", icon: "/logos/linux.svg" },
      { name: "Bash", icon: "/logos/gnubash.svg" },
      { name: "Windows Server", icon: "/logos/windows.svg" },
      { name: "Git", icon: "/logos/git.svg" },
      { name: "VirtualBox", icon: "/logos/virtualbox.svg" },
    ],
  },
  {
    category: "Embedded Systems, Hardware & DSP",
    items: [
      { name: "Zephyr RTOS", icon: "/logos/zephyr.svg" },
      { name: "Bare-Metal Programming", icon: "/logos/baremetal.svg" },
      { name: "STM32Cube", icon: "/logos/stm32cube.svg" },
      { name: "ROS 2", icon: "/logos/ros.svg" },
      { name: "Raspberry Pi", icon: "/logos/raspberrypi.svg" },
      { name: "Vivado", icon: "/logos/vivado.svg" },
      { name: "FPGA", icon: "/logos/fpga.svg" },
      { name: "Digital Signal Processing", icon: "/logos/dsp.svg" },
    ],
  },
];
