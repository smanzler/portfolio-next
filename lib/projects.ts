import projects from "@/data/projects.json";

export interface Asset {
  type: string;
  path: string;
  fallback?: string;
  alt?: string;
  width: number;
  height: number;
}

export interface Review {
  name: string;
  review: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Policy {
  lastUpdated?: string;
  sections: {
    title: string;
    content: (string | string[])[];
  }[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  icon: string;
  heroAsset: Asset;
  assets?: Asset[];
  link?: string;
  featured?: boolean;
  isApp?: boolean;
  github?: string;
  role?: string;
  timeline?: string;
  problemAndSolution: {
    problem: string;
    solution: string;
  };
  keyFeatures: string[];
  technicalHighlights: string[];
  challenges?: {
    problem: string;
    solution: string;
  }[];
  productDecisions?: string[];
  nextSteps?: string[];
  reviews?: Review[];
  faq?: FAQ[];
  privacyPolicy?: Policy;
  termsOfService?: Policy;
}

export function getProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags.includes(tag));
}
