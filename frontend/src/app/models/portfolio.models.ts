export interface ProfileShow {
  name?: boolean;
  title?: boolean;
  bio?: boolean;
  location?: boolean;
  email?: boolean;
  phone?: boolean;
  image?: boolean;
}

export interface SkillIcon {
  icon?: string;
  iconClass: string;
  label: string;
  badgeText?: string;
}

export interface SkillCategory {
  icon: string;
  title: string;
  description: string;
  count: number;
  items: SkillIcon[];
}

export interface Project {
  index: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  linkLabel: string;
  linkIcon: string;
  linkHref: string;
  featured?: boolean;
}

export interface CvEntry {
  title: string;
  org: string;
  date?: string;
}

export interface AvailabilityItem {
  title: string;
  status: 'open' | 'progress' | 'closed';
  note: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  heroText: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  image: string;
  portfolioVisible: boolean;
  show: ProfileShow;
  socials: SocialLink[];
  availability: AvailabilityItem[];
}

export interface SocialLink {
  _id?: string;
  platform: string;
  url: string;
  icon?: string;
  visible?: boolean;
}

export interface PortfolioExtra {
  _id?: string;
  title: string;
  org: string;
  date?: string;
  type: 'education' | 'experience';
}
