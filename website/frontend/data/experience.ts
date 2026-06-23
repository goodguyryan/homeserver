export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    role: "DevOps Intern",
    company: "Synapxe",
    startDate: "Jan 2026",
    endDate: "Present",
    description: [
      "Automated system administrative workflows using Ansible, reducing manual configuration time by up to 80% across 200+ servers.",
      "Built an end-to-end VM-based CI/CD pipeline, creating and configuring base VM images and automating clone provisioning and lifecycle management to test and validate Ansible playbooks.",
      "Designed a centralized server management database and internal operations tool to standardize server information across diverse environments, improving infrastructure visibility and supporting ~20 engineers.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Schneider Electric",
    startDate: "Jul 2025",
    endDate: "Oct 2025",
    description: [
      "Developed and deployed embedded software on STM32 using Zephyr RTOS, integrating an HTTP server, file system, and the LLEXT subsystem for extensible runtime functionality.",
      "Engineered a secure bootloader for STM32 using Zephyr RTOS, implementing RSA-2048 signature verification and SHA-256 hashing to ensure 100% firmware integrity during the boot process.",
      "Created automation scripts to streamline the software build pipeline, reducing manual workload by 75% and ensuring consistency across all build processes.",
    ],
  },
  {
    role: "Project Intern",
    company: "IRAS",
    startDate: "Dec 2023",
    endDate: "May 2024",
    description: [
      "Cleaned and processed large datasets while designing and maintaining a sequential database of 1,000+ companies to track onboarding status, improving data integrity by 20% and operational efficiency by 25%.",
      "Performed routine sandbox testing and queried the IRIN system to validate data accuracy and support operational workflows.",
    ],
  },
];
