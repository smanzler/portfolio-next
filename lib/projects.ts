// lib/projects.ts
import projects from "@/data/projects.json";

export interface Asset {
  type: string;
  path: string;
  fallback?: string;
  alt?: string;
  width: number;
  height: number;
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
