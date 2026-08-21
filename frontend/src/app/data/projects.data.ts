import { Project } from "../models/portfolio.models";

export const PROJECTS: Project[] = [
  {
    index: "01 / HEALTHCARE",
    title: "Dental Clinic Management System",
    description:
      "Appointment booking, patient records and an admin dashboard for clinic operations.",
    image: "assets/project-ecommerce.svg",
    imageAlt: "Dental Clinic Management System preview",
    tags: ["PHP", "MySQL", "Bootstrap"],
    linkLabel: "Case Study",
    linkIcon: "fa-solid fa-arrow-right",
    linkHref: "#",
    featured: true,
  },
  {
    index: "02 / REAL ESTATE",
    title: "Real Estate Platform",
    description:
      "Property listing and management website with search and admin controls.",
    image: "assets/project-dashboard.svg",
    imageAlt: "Real Estate Platform preview",
    tags: ["React", "Node.js", "MongoDB"],
    linkLabel: "GitHub",
    linkIcon: "fa-brands fa-github",
    linkHref: "#",
  },
  {
    index: "03 / E-COMMERCE",
    title: "E-Commerce Platforms",
    description:
      "Online shopping websites for clothing and home appliances, from catalog to checkout.",
    image: "assets/project-api.svg",
    imageAlt: "E-Commerce Platform preview",
    tags: ["React", "PHP", "MySQL"],
    linkLabel: "GitHub",
    linkIcon: "fa-brands fa-github",
    linkHref: "#",
  },
];
