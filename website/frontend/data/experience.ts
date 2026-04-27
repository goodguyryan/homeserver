export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    role: "DevOps Engineer",
    company: "Company A",
    startDate: "Jan 2024",
    endDate: "Present",
    description: [
      "Designed and maintained CI/CD pipelines for microservices architecture.",
      "Managed Kubernetes clusters and container orchestration across environments.",
      "Implemented Infrastructure as Code using Terraform and Ansible.",
    ],
  },
  {
    role: "Cloud Engineer",
    company: "Company B",
    startDate: "Jun 2022",
    endDate: "Dec 2023",
    description: [
      "Built and optimized AWS infrastructure for high-availability applications.",
      "Automated deployment workflows reducing release cycles by 40%.",
      "Monitored and improved system reliability and performance.",
    ],
  },
  {
    role: "Software Developer",
    company: "Company C",
    startDate: "Aug 2020",
    endDate: "May 2022",
    description: [
      "Developed backend services using Python and Go.",
      "Contributed to migrating monolithic applications to containerized microservices.",
    ],
  },
];
