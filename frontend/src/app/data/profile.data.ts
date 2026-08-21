import { Profile } from "../models/portfolio.models";
export const DEFAULT_PROFILE: Profile = {
  name: "Mohamed Bakr",
  role: "Software Engineer & Web Developer",
  tagline: "DEVELOPER • DESIGNER • CREATOR",
  heroText:
    "Software Engineering student with hands-on experience building web applications, management systems, dashboards and e-commerce solutions.",
  bio: "Software Engineering student with hands-on experience building web applications, management systems, dashboards and e-commerce solutions.",
  location: "Giza, Egypt",
  email: "Mbr01007621552@gmail.com",
  phone: "+20 101 783 7243",
  image: "assets/profile.jpg",
  portfolioVisible: true,
  show: {
    name: true,
    title: true,
    bio: true,
    location: true,
    email: true,
    phone: true,
    image: true,
  },
  socials: [
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/mohamed-bakr-b1b473320",
      visible: true,
    },
    { platform: "whatsapp", url: "https://wa.me/201017837243", visible: true },
  ],
  availability: [
    {
      title: "Open to opportunities",
      status: "open",
      note: "Available now — internship or freelance work.",
    },
  ],
};
