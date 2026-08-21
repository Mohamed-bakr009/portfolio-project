import { SkillCategory } from "../models/portfolio.models";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: "fa-solid fa-layer-group",
    title: "Frontend",
    description: "Responsive interfaces & reusable components",
    count: 7,
    items: [
      { icon: "fa-brands fa-html5", iconClass: "ic-html", label: "HTML5" },
      { icon: "fa-brands fa-css3-alt", iconClass: "ic-css", label: "CSS3" },
      {
        icon: "fa-brands fa-bootstrap",
        iconClass: "ic-bootstrap",
        label: "Bootstrap",
      },
      { icon: "fa-solid fa-wind", iconClass: "ic-tailwind", label: "Tailwind" },
      {
        icon: "fa-brands fa-square-js",
        iconClass: "ic-js",
        label: "JavaScript",
      },
      { icon: "fa-solid fa-t", iconClass: "ic-ts", label: "TypeScript" },
      { icon: "fa-brands fa-react", iconClass: "ic-react", label: "React.js" },
    ],
  },
  {
    icon: "fa-solid fa-server",
    title: "Backend",
    description: "Server logic, APIs & database design",
    count: 5,
    items: [
      { icon: "fa-brands fa-php", iconClass: "ic-php", label: "PHP" },
      { icon: "fa-solid fa-database", iconClass: "ic-mysql", label: "MySQL" },
      { icon: "fa-solid fa-leaf", iconClass: "ic-mongo", label: "MongoDB" },
      { icon: "fa-brands fa-node-js", iconClass: "ic-node", label: "Node.js" },
      {
        icon: "fa-solid fa-diagram-project",
        iconClass: "ic-express",
        label: "Express.js",
      },
    ],
  },
  {
    icon: "fa-solid fa-code",
    title: "Languages",
    description: "Core programming foundations",
    count: 4,
    items: [
      { icon: "fa-brands fa-java", iconClass: "ic-java", label: "Java" },
      { iconClass: "", label: "C", badgeText: "C" },
      { iconClass: "", label: "C++", badgeText: "C++" },
      { icon: "fa-brands fa-python", iconClass: "ic-python", label: "Python" },
    ],
  },
  {
    icon: "fa-solid fa-toolbox",
    title: "Tools & Platforms",
    description: "Workflow, deployment & networking",
    count: 6,
    items: [
      { icon: "fa-brands fa-git-alt", iconClass: "ic-git", label: "Git" },
      { icon: "fa-brands fa-github", iconClass: "ic-github", label: "GitHub" },
      {
        icon: "fa-solid fa-paper-plane",
        iconClass: "ic-postman",
        label: "Postman",
      },
      { icon: "fa-brands fa-linux", iconClass: "ic-linux", label: "Linux" },
      {
        icon: "fa-solid fa-mobile-screen-button",
        iconClass: "ic-flutter",
        label: "Flutter",
      },
      {
        icon: "fa-solid fa-network-wired",
        iconClass: "ic-ccna",
        label: "CCNA",
      },
    ],
  },
];
