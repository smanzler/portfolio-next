// src/hooks/useProjects.ts
import { useMemo } from "react";
import invtMainImage from "../public/invt/invt.png";
import invtDetailImage1 from "../public/invt/image.png";
import repImage from "../public/rep.png";
import portfolioImage from "../public/portfolio.png";
import writtenImage from "../public/portfolio.png";
import repIcon from "../public/rep-icon.png";
import invtIcon from "../public/invt/invt-icon.png";
import portfolioIcon from "../public/simon-icon.png";
import writtenIcon from "../public/written-icon.png";
import { StaticImageData } from "next/image";

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: StaticImageData;
  icon: StaticImageData;
  images?: StaticImageData[];
  link?: string;
  featured?: boolean;
  github?: string;
  role?: string;
  timeline?: string;
  keyFeatures?: string[];
  challenges?: string[];
  technologies?: {
    category: string;
    items: string[];
  }[];
}
export function useProjects() {
  const projects: Project[] = useMemo(
    (): Project[] => [
      {
        title: "INVT",
        description:
          "Find and rsvp to events made by others and invite friends through QR codes.",
        longDescription:
          "INVT is a modern event management platform that simplifies event discovery and RSVP management. Users can create events, share them with friends via QR codes, and track attendance in real-time. The app features a clean, intuitive interface built with React and styled with TailwindCSS, while Firebase handles authentication, real-time data synchronization, and cloud storage.",
        tags: ["React", "TypeScript", "TailwindCSS", "Shadcn UI", "Supabase"],
          image: invtMainImage,
          icon: invtIcon,
        images: [invtMainImage, invtDetailImage1],
        link: "https://invt.rsvp",
        featured: true,
        role: "Lead Full Stack Developer",
        timeline: "2024 - Present",
        keyFeatures: [
          "Real-time event discovery and search functionality",
          "QR code generation for easy event sharing",
          "RSVP management with guest list tracking",
          "User authentication and profile management",
          "Responsive design for mobile and desktop",
        ],
        challenges: [
          "Implementing real-time synchronization across multiple users",
          "Optimizing QR code generation and scanning performance",
          "Designing an intuitive UX for event creation and management",
        ],
        technologies: [
          {
            category: "Frontend",
            items: ["React", "TypeScript", "TailwindCSS", "Shadcn UI"],
          },
          {
            category: "Backend",
            items: ["Firebase Auth", "Firestore", "Firebase Storage"],
          },
          {
            category: "Tools",
            items: ["Vite", "ESLint", "Git"],
          },
        ],
      },
      {
        title: "Rep",
        description:
          "Track workouts, view progress, share with friends, and sync data offline.",
        longDescription:
          "Rep is a comprehensive workout tracking mobile application built with React Native and Expo. It enables users to log exercises, track progress over time, and share achievements with friends. The app features offline-first architecture, ensuring users can log workouts without internet connectivity, with automatic synchronization when connection is restored. Supabase provides real-time data sync, authentication, and cloud storage.",
        tags: ["React Native", "Supabase", "Expo"],
        image: repImage,
        icon: repIcon,
        images: [repIcon, repIcon, repIcon],
        link: "https://github.com/smanzler/workout-tracker",
        featured: true,
        github: "https://github.com/smanzler/workout-tracker",
        role: "Mobile Developer",
        timeline: "2024",
        keyFeatures: [
          "Offline-first architecture with automatic sync",
          "Exercise library with custom exercise creation",
          "Progress tracking with charts and statistics",
          "Workout history and personal records",
          "Social features for sharing progress with friends",
          "Real-time data synchronization via Supabase",
        ],
        challenges: [
          "Implementing robust offline data persistence and conflict resolution",
          "Optimizing performance for smooth animations and transitions",
          "Designing an intuitive UI for complex workout logging flows",
        ],
        technologies: [
          {
            category: "Mobile",
            items: ["React Native", "Expo", "TypeScript"],
          },
          {
            category: "Backend",
            items: ["Supabase", "PostgreSQL", "Supabase Auth"],
          },
          {
            category: "Tools",
            items: ["Expo Go", "Git", "ESLint"],
          },
        ],
      },
      {
        title: "Portfolio",
        description:
          "Modern portfolio website built with React and TailwindCSS and responsive design. It showcases my projects and skills.",
        longDescription:
          "A modern, responsive portfolio website designed to showcase my projects, skills, and experience. Built with React and styled with TailwindCSS and Shadcn UI components, the site features smooth animations, dark mode support, and an intuitive navigation experience. The site is deployed on GitHub Pages and serves as a central hub for my professional presence.",
        tags: ["React", "TailwindCSS", "Shadcn UI", "Github Pages"],
        image: portfolioImage,
        icon: portfolioIcon,
        images: [portfolioImage, portfolioImage, portfolioImage],
        link: "https://simonmanzler.com",
        featured: true,
        github: "https://github.com/smanzler/portfolio",
        role: "Frontend Developer & Designer",
        timeline: "2024",
        keyFeatures: [
          "Fully responsive design optimized for all devices",
          "Dark mode support with theme persistence",
          "Smooth scroll animations and transitions",
          "Project showcase with detailed case studies",
          "Contact form with validation",
          "SEO optimized with meta tags",
        ],
        challenges: [
          "Creating a unique and memorable design that stands out",
          "Optimizing performance and load times",
          "Ensuring accessibility standards are met",
        ],
        technologies: [
          {
            category: "Frontend",
            items: ["React", "TypeScript", "TailwindCSS", "Shadcn UI"],
          },
          {
            category: "Deployment",
            items: ["GitHub Pages", "Vite"],
          },
          {
            category: "Tools",
            items: ["Git", "ESLint", "Prettier"],
          },
        ],
      },
      {
        title: "Written",
        description:
          "Infinite Journal built with React, Vite and Typescript. It allows users to write and save their journal entries. It also allows users to see their journal entries and compare their scores with their friends.",
        tags: ["React", "Vite", "Typescript"],
        link: "https://written.simonmanzler.com",
        github: "https://github.com/smanzler/written",
        image: writtenImage,
        icon: writtenIcon,
        images: [writtenImage, writtenImage, writtenImage],
      },
    ],
    []
  );

  return { projects };
}
