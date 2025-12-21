// src/hooks/useProjects.ts
import { useMemo } from "react";

import repIcon from "../public/rep/icon.png";
import repImage1 from "../public/rep/image1.png";
import repImage2 from "../public/rep/image2.png";
import repImage3 from "../public/rep/image3.png";
import repImage4 from "../public/rep/image4.png";
import repImage5 from "../public/rep/image5.png";
import repImage6 from "../public/rep/image6.png";
import repImage7 from "../public/rep/image7.png";
import repImage8 from "../public/rep/image8.png";
import repImage9 from "../public/rep/image9.png";
import repImage10 from "../public/rep/image10.png";
import repImage11 from "../public/rep/image11.png";
import repImage12 from "../public/rep/image12.png";
import repImage13 from "../public/rep/image13.png";
import repImage14 from "../public/rep/image14.png";
import repImage15 from "../public/rep/image15.png";
import repVideo1Fallback from "../public/rep/video1-fallback.png";

import invtIcon from "../public/invt/icon.png";
import invtImage1 from "../public/invt/image1.png";
import invtImage2 from "../public/invt/image2.png";
import invtImage3 from "../public/invt/image3.png";
import invtImage4 from "../public/invt/image4.png";
import invtImage5 from "../public/invt/image5.png";
import invtImage6 from "../public/invt/image6.png";
import invtImage7 from "../public/invt/image7.png";
import invtImage8 from "../public/invt/image8.png";
import invtImage9 from "../public/invt/image9.png";
import invtVideo1Fallback from "../public/invt/video1-fallback.png";

import portfolioIcon from "../public/portfolio/icon.png";
import portfolioImage1 from "../public/portfolio/image1.png";
import portfolioImage2 from "../public/portfolio/image2.png";
import portfolioImage3 from "../public/portfolio/image3.png";
import portfolioImage4 from "../public/portfolio/image4.png";
import portfolioImage5 from "../public/portfolio/image5.png";
import portfolioImage6 from "../public/portfolio/image6.png";
import portfolioImage7 from "../public/portfolio/image7.png";
import portfolioImage8 from "../public/portfolio/image8.png";
import portfolioImage9 from "../public/portfolio/image9.png";

import writtenIcon from "../public/written/icon.png";
import writtenImage1 from "../public/written/image1.png";
import writtenImage2 from "../public/written/image2.png";
import writtenImage3 from "../public/written/image3.png";
import writtenImage4 from "../public/written/image4.png";
import writtenImage5 from "../public/written/image5.png";
import writtenImage6 from "../public/written/image6.png";
import writtenImage7 from "../public/written/image7.png";
import writtenVideo1Fallback from "../public/written/video1-fallback.png";
import writtenVideo2Fallback from "../public/written/video2-fallback.png";

import dashIcon from "../public/dash-icon.png";

import mclistIcon from "../public/mclist/icon.png";
import mclistImage1 from "../public/mclist/image1.png";
import mclistImage2 from "../public/mclist/image2.png";
import mclistImage3 from "../public/mclist/image3.png";
import mclistImage4 from "../public/mclist/image4.png";
import mclistVideo1Fallback from "../public/mclist/video1-fallback.png";

import { StaticImageData } from "next/image";

export interface Asset {
  type: "image" | "video";
  src: string | StaticImageData;
  fallback?: StaticImageData;
  alt?: string;
}

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  icon: StaticImageData;
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
export function useProjects() {
  const projects: Project[] = useMemo(
    (): Project[] => [
      {
        title: "Written",
        description:
          "A local-first journaling app focused on satisfying writing, privacy, and ownership.",
        longDescription: `Written is a journaling and writing app designed to make typing feel calm, private, and satisfying. The project evolved through several iterations—from early typing practice tools to a focused journaling experience—each version reflecting growth in frontend development, product thinking, and architecture.

The app is built with a local-first mindset, prioritizing privacy, responsiveness, and offline use.`,
        tags: ["React", "Vite", "Typescript"],
        link: "https://written.simonmanzler.com",
        github: "https://github.com/smanzler/written",
        heroAsset: {
          type: "video",
          src: "/written/video1.mov",
          fallback: writtenVideo1Fallback,
          alt: "Writing Demo",
        },
        icon: writtenIcon,
        assets: [
          {
            type: "image",
            src: writtenImage1,
            alt: "Written Icon",
          },
          {
            type: "image",
            src: writtenImage2,
            alt: "Sidebar",
          },
          {
            type: "image",
            src: writtenImage3,
            alt: "Journal Entry",
          },
          {
            type: "image",
            src: writtenImage4,
            alt: "Account Settings",
          },
          {
            type: "image",
            src: writtenImage5,
            alt: "Security Settings",
          },
          {
            type: "video",
            src: "/written/video2.mov",
            fallback: writtenVideo2Fallback,
            alt: "Appearance Settings",
          },
          {
            type: "image",
            src: writtenImage6,
            alt: "AI Settings",
          },
          {
            type: "image",
            src: writtenImage7,
            alt: "Login Screen",
          },
        ],
        problemAndSolution: {
          problem:
            "Many journaling apps feel either overly complex or disconnected from the tactile satisfaction of writing by hand. Typing can feel sterile, and privacy is often unclear.",

          solution:
            "Written focuses on the writing experience itself: a minimal interface, local-first storage, optional encryption, and thoughtful customization. Features are added only when they improve daily use, guided by actively using the app as a journal.",
        },
        keyFeatures: [
          "Distraction-free journaling experience",
          "Local-first data storage using IndexedDB",
          "End-to-end encryption for journal entries",
          "Customizable cursor and text colors",
          "Optional on-device AI processing via local LLMs",
          "Cross-device sync with encrypted data",
        ],
        technicalHighlights: [
          "Built with React and Vite using a component-driven design with shadcn/ui",
          "Implemented local-first storage using Dexie (IndexedDB)",
          "Added client-side encryption for journal entries to ensure data privacy",
          "Integrated WebLLM to run AI models locally without sending data to a server",
          "Built a custom sync engine from scratch, including encrypted push and pull logic",
          "Designed the system to function fully offline with optional sync",
        ],
        challenges: [
          {
            problem: "Local-First Sync with Encryption",
            solution:
              "Designed and implemented a custom sync system that supports encrypted journal entries, handling edge cases around conflict resolution, key management, and partial sync failures.",
          },

          {
            problem: "Client-Side Encryption",
            solution:
              "Implemented encryption for sensitive user data, balancing security, performance, and usability without relying on backend processing.",
          },

          {
            problem: "Running AI Locally",
            solution:
              "Integrated local LLMs using WebLLM, enabling users to analyze or reflect on their entries without uploading content to external services.",
          },

          {
            problem: "Product Focus & Restraint",
            solution:
              "Resisted feature creep by adding functionality only when it improved real usage, guided by daily use of the app as a journaling tool.",
          },
        ],
        productDecisions: [
          "Actively used the app to guide feature development",
          "Prioritized privacy and ownership over convenience",
          "Chose local-first architecture to ensure reliability and trust",
          "Kept AI features optional, lightweight, and user-controlled",
        ],
      },
      {
        title: "Rep",
        description:
          "Track workouts, view progress, share with friends, and sync data offline.",
        longDescription:
          "Rep is a workout tracking app built to support consistent strength training without unnecessary complexity. Inspired by existing apps like Strong, Rep focuses on fast workout logging, offline reliability, and meaningful progress tracking. The app uses a local-first architecture and is designed around real gym usage, with features added only when they proved necessary.",
        tags: ["React Native", "Supabase", "Expo"],

        icon: repIcon,
        heroAsset: {
          type: "video",
          src: "/rep/video1.mov",
          fallback: repVideo1Fallback,
          alt: "Workout Demo",
        },
        assets: [
          {
            type: "image",
            src: repImage1,
            alt: "Rep Homepage",
          },
          {
            type: "image",
            src: repImage2,
            alt: "Profile Page",
          },
          {
            type: "image",
            src: repImage3,
            alt: "Start Workout Page",
          },
          {
            type: "image",
            src: repImage4,
            alt: "History Page",
          },
          {
            type: "image",
            src: repImage5,
            alt: "Details Modal",
          },
          {
            type: "image",
            src: repImage6,
            alt: "Add Exercise Modal",
          },
          {
            type: "image",
            src: repImage7,
            alt: "Add Exercise Modal 2",
          },
          {
            type: "image",
            src: repImage8,
            alt: "Workout Modal",
          },
          {
            type: "image",
            src: repImage9,
            alt: "Completing Sets",
          },
          {
            type: "image",
            src: repImage10,
            alt: "Completed Workout",
          },
          {
            type: "image",
            src: repImage11,
            alt: "Explore Page",
          },
          {
            type: "image",
            src: repImage12,
            alt: "Create Post Page",
          },
          {
            type: "image",
            src: repImage13,
            alt: "Add Workout To Post",
          },
          {
            type: "image",
            src: repImage14,
            alt: "Settings Dropdown",
          },
          {
            type: "image",
            src: repImage15,
            alt: "Notifications Page",
          },
        ],
        link: "https://apps.apple.com/us/app/rep-workout-tracker/id6743640996",

        isApp: true,
        github: "https://github.com/smanzler/workout-tracker",
        role: "Mobile Developer",
        timeline: "2024",
        keyFeatures: [
          "Log workouts, exercises, and sets with offline support",
          "Local-first data storage with background sync",
          "Track workout history and personal records",
          "Social feed with shared workouts, likes, and interactions",
          "Push notifications for follows and likes",
          "Native charts for visualizing workout progress",
        ],
        problemAndSolution: {
          problem:
            "Many workout apps include excessive features that slow down basic logging and don't adapt well to real gym workflows.",

          solution:
            "Rep prioritizes speed, offline support, and usability by storing all workout data locally and syncing in the background. By using the app personally, features were shaped by real needs rather than assumptions, leading to a focused and practical MVP.",
        },
        technicalHighlights: [
          "Built with React Native for cross-platform development",
          "Implemented a local-first data model using WatermelonDB",
          "Designed custom sync logic with Supabase for pushing and pulling workout data",
          "Built a social feed with relational data for users, posts, workouts, and likes",
          "Integrated native Swift modules to render performant charts",
          "Implemented push notifications with in-app toasts when the app is active",
        ],
        challenges: [
          {
            problem: "Local-First Sync Architecture",
            solution:
              "Implemented bidirectional sync between the local database and Supabase, handling conflict resolution and ensuring data consistency across sessions and devices.",
          },
          {
            problem: "Social Feed & Data Modeling",
            solution:
              "Designed a relational schema to support posts, attached workouts, likes, and follow relationships while keeping feed queries performant.",
          },
          {
            problem: "Native Chart Rendering",
            solution:
              "Built native chart components using Swift and bridged them into React Native to achieve smooth, high-performance visualizations.",
          },
          {
            problem: "Notifications & In-App Feedback",
            solution:
              "Implemented push notifications for social interactions and handled in-app notification states with custom toasts when the app is open.",
          },
        ],
        productDecisions: [
          "Shipped an MVP quickly and expanded features only when they were validated by real usage",
          "Prioritized usability over feature count",
          "Stopped feature development when additions no longer improved the core experience",
          "Used personal daily usage to guide UX and feature priorities",
        ],
      },
      {
        title: "INVT",
        description:
          "Find and rsvp to events made by others and invite friends through QR codes.",
        longDescription:
          "INVT simplifies event discovery and RSVP management through a clean, intuitive interface. Users can create events, share invitations via QR codes, sell tickets, and track attendance. The platform is built with React and styled using shadcn/ui and TailwindCSS, with Supabase handling authentication, storage, and real-time data.",
        tags: ["React", "TypeScript", "TailwindCSS", "Shadcn UI", "Supabase"],

        icon: invtIcon,
        heroAsset: {
          type: "video",
          src: "/invt/video1.mov",
          fallback: invtVideo1Fallback,
          alt: "Event Details",
        },
        assets: [
          {
            type: "image",
            src: invtImage1,
            alt: "INVT Homepage",
          },
          {
            type: "image",
            src: invtImage2,
            alt: "Main Page",
          },
          {
            type: "image",
            src: invtImage3,
            alt: "Create Event Page",
          },
          {
            type: "image",
            src: invtImage4,
            alt: "RSVPs Page",
          },
          {
            type: "image",
            src: invtImage5,
            alt: "Map View",
          },
          {
            type: "image",
            src: invtImage6,
            alt: "Profile Page",
          },
          {
            type: "image",
            src: invtImage7,
            alt: "Notifications Page",
          },
          {
            type: "image",
            src: invtImage8,
            alt: "Past Events",
          },
          {
            type: "image",
            src: invtImage9,
            alt: "Sign In Page",
          },
        ],
        link: "https://invt.rsvp",

        role: "Independent Contractor",
        timeline: "June 2025 - Present",
        problemAndSolution: {
          problem:
            "Existing event platforms were overly complex and difficult to use for both organizers and attendees.",
          solution:
            "INVT focuses on a streamlined experience by removing unnecessary features while still supporting essential workflows like invitations, ticket sales, and attendee management.",
        },
        keyFeatures: [
          "Create and manage public or private events",
          "Share invites via QR codes and track invite attribution",
          "Sell event tickets directly through the platform",
          "Retarget previous attendees for future events",
          "Authentication, storage, and real-time data powered by Supabase",
        ],
        technicalHighlights: [
          "Migrated backend from Firebase to Supabase to support relational data and improve scalability",
          "Designed a relational PostgreSQL schema for events, users, tickets, and invites",
          "Implemented web push notifications using the Web Push API and a custom service worker integration with Vite",
          "Integrated Stripe using a marketplace model, allowing individual event hosts to manage payouts and taxes independently",
          "Built a responsive UI using shadcn/ui and TailwindCSS for consistent and easily adjustable styling",
        ],
        challenges: [
          {
            problem: "Backend Migration",
            solution:
              "Transitioned from Firebase to Supabase to improve relational data modeling and avoid vendor lock-in. This required refactoring data access patterns, rebuilding authentication flows, and migrating storage logic.",
          },
          {
            problem: "Web Push Notifications",
            solution:
              "Implemented push notifications in a PWA environment, including handling HTTPS requirements and service worker constraints when the app is inactive.",
          },
          {
            problem: "Payments Architecture",
            solution:
              "Chose a Stripe marketplace model to enable multiple organizers to sell tickets while managing payouts and tax responsibilities independently.",
          },
          {
            problem: "UX Consistency",
            solution:
              "Used shadcn/ui as a foundation to maintain design consistency while allowing rapid iteration on layout and interaction patterns.",
          },
        ],
        nextSteps: [
          "Improve analytics for event organizers",
          "Expand attendee engagement tools",
          "Enhance accessibility and mobile UX",
        ],
      },
      {
        title: "Portfolio",
        description:
          "A continuously evolving portfolio used to practice design, animation, and modern frontend patterns.",
        longDescription: `This portfolio is a long-running project that has evolved alongside my growth as a developer. It began as a static HTML/CSS site, was later migrated to React with Vite, and is now built with Next.js. Each iteration reflects new tools, patterns, and design principles I’ve learned over time.
        
        The site also serves as the official domain for my published apps, hosting privacy policies and terms of service required for App Store distribution.`,
        tags: [
          "Next.js",
          "React",
          "TypeScript",
          "TailwindCSS",
          "Shadcn UI",
          "motion",
          "Vercel",
        ],
        heroAsset: {
          type: "image",
          src: portfolioImage1,
          alt: "Portfolio Homepage",
        },
        icon: portfolioIcon,
        assets: [
          {
            type: "image",
            src: portfolioImage2,
            alt: "Featured Projects",
          },
          {
            type: "image",
            src: portfolioImage3,
            alt: "Skills",
          },
          {
            type: "image",
            src: portfolioImage4,
            alt: "About Me",
          },
          {
            type: "image",
            src: portfolioImage5,
            alt: "Experience",
          },
          {
            type: "image",
            src: portfolioImage6,
            alt: "Contact",
          },
          {
            type: "image",
            src: portfolioImage7,
            alt: "Footer",
          },
          {
            type: "image",
            src: portfolioImage8,
            alt: "Projects Page",
          },
          {
            type: "image",
            src: portfolioImage9,
            alt: "Project Details Page",
          },
        ],
        link: "https://simonmanzler.com",
        github: "https://github.com/smanzler/portfolio",
        role: "Frontend Developer & Designer",
        timeline: "2024",
        problemAndSolution: {
          problem:
            "Early versions of my portfolio quickly became outdated as my skills improved, making it difficult to reflect my current abilities.",
          solution:
            "Instead of treating the portfolio as a finished product, I designed it as an evolving system — a place to experiment with modern tooling, subtle animations, and component-driven design while maintaining a clean and professional presentation.",
        },
        keyFeatures: [
          "Component-driven UI built with shadcn/ui and TailwindCSS",
          "Subtle, purposeful animations to enhance UX without distraction",
          "Modular layout that supports iteration and content reorganization",
          "Deployed as a stable domain for App Store privacy policies and legal pages",
          "Continuously updated to reflect current skills and projects",
        ],
        technicalHighlights: [
          "Migrated the project across multiple stacks (HTML/CSS → React + Vite → Next.js)",
          "Implemented motion-based UI interactions using the Motion library",
          "Used shadcn/ui components as a foundation for rapid experimentation and reuse",
          "Designed flexible layouts to accommodate different project types and page structures",
          "Balanced animation performance and accessibility with visual polish",
        ],
        challenges: [
          {
            problem: "Animation Without Overuse",
            solution:
              "Learned to design subtle, UX-driven animations that support interaction and hierarchy rather than overpowering the content.",
          },
          {
            problem: "Design Identity",
            solution:
              "Iterated on typography, spacing, and layout to find a visual style that feels personal, confident, and professional.",
          },
          {
            problem: "Content Organization",
            solution:
              "Refined how projects, sections, and information are structured to keep the site scannable while still expressive.",
          },
        ],
        productDecisions: [
          "Treated the portfolio as a living project rather than a static deliverable",
          "Used real experimentation instead of artificial demos",
          "Practiced new components and UI patterns directly in production",
          "Prioritized clarity and restraint over visual noise",
        ],
      },
      {
        title: "Dash",
        description:
          "A map-based running app focused on route creation and performance tracking.",
        longDescription: `Dash is a mobile running app built as an MVP to validate an idea developed for an entrepreneurship course. The app allows users to create custom running routes on a map and then run those routes while tracking performance data.

The project was also an opportunity to deepen native iOS experience by building all map-related UI and GPS logic in Swift and bridging it into a React Native app using Expo native modules.`,
        tags: ["Expo", "TypeScript", "Swift", "Mapbox IOS SDK"],
        isApp: true,
        heroAsset: {
          type: "image",
          src: dashIcon,
          alt: "Dash Video 1",
        },
        icon: dashIcon,
        problemAndSolution: {
          problem:
            "Many running apps focus on general activity tracking rather than route-specific performance.",

          solution:
            "Dash focuses on predefined routes: users draw tracks on a map and later run those same routes to measure and compare performance, laying the foundation for competitive and social features.",
        },
        keyFeatures: [
          "Create and save custom running routes on an interactive map",
          "Track runs using real-time GPS data",
          "Calculate basic performance stats from raw location data",
          "Leaderboards powered by scheduled background jobs",
          "Native map and GPS handling for accuracy and performance",
        ],
        technicalHighlights: [
          "Built with React Native using Expo",
          "Implemented all map and GPS UI in Swift for native performance",
          "Created Expo native modules to bridge Swift functionality into JavaScript",
          "Used cron jobs to update leaderboards on a schedule",
          "Designed the app as an MVP with a clear path for future refinement",
        ],
        challenges: [
          {
            problem: "Learning Swift in a Production Context",
            solution:
              "Used native map and GPS features as an entry point into Swift, prioritizing performance-sensitive functionality where native code matters most.",
          },

          {
            problem: "GPS Data Handling",
            solution:
              "Started with raw GPS data for stat calculations, with plans to refine accuracy and smoothing in future iterations.",
          },
        ],
        productDecisions: [
          "Focused on delivering a usable MVP quickly",
          "Chose native implementations for maps and GPS to avoid abstraction limitations",
          "Deferred advanced analytics until core functionality was validated",
          "Scoped features tightly to avoid overengineering",
        ],
      },
      {
        title: "MCList",
        timeline: "November 2025",
        description:
          "A visual, interactive tool for tracking materials needed for Minecraft builds.",
        longDescription: `This web app helps Minecraft players track and manage materials needed for their builds. By parsing text-based lists from YouTube descriptions or other sources, it provides a visual checklist with images from the Minecraft Wiki and interactive progress tracking.

Users can save builds locally, mark items as completed, and share builds via a compressed URL with metadata for social sharing.`,
        github: "https://github.com/smanzler/mclist",
        link: "https://mclist.simonmanzler.com",
        tags: ["Next.js", "React", "TypeScript", "Dexie", "Motion", "Lottie"],
        heroAsset: {
          type: "video",
          src: "/mclist/video1.mov",
          fallback: mclistVideo1Fallback,
          alt: "MCList Video 1",
        },
        icon: mclistIcon,
        assets: [
          {
            type: "image",
            src: mclistImage1,
            alt: "MCList Image 1",
          },
          {
            type: "image",
            src: mclistImage2,
            alt: "MCList Image 2",
          },
          {
            type: "image",
            src: mclistImage3,
            alt: "MCList Image 3",
          },
          {
            type: "image",
            src: mclistImage4,
            alt: "MCList Image 4",
          },
        ],
        problemAndSolution: {
          problem:
            "Minecraft players often struggle with large material lists, which are typically shared as plain text in video descriptions or forums. These lists are difficult to visualize and track.",
          solution:
            "The app solves this by converting text into interactive visual checklists, allowing users to see, check off, and manage items efficiently, making planning builds faster and more satisfying.",
        },
        keyFeatures: [
          "Parse text-based material lists into visual checklists",
          "Display item images from the Minecraft Wiki for better clarity",
          "Save builds locally using Dexie (IndexedDB)",
          "Mark items as completed with Lottie-powered explosion animations",
          "Share builds via compressed URLs with metadata for social previews",
        ],
        technicalHighlights: [
          "Built in Next.js with React and TypeScript for fast iteration",
          "Used Motion and Lottie for interactive animations and polished UX",
          "Implemented local storage with Dexie for offline-first persistence",
          "Compressed build data in URLs to support large builds without long links",
          "Generated metadata dynamically for sharing and social previews",
        ],
        productDecisions: [
          "Focused on fun, visual feedback for item completion",
          "Scoped features tightly to avoid overengineering",
        ],
      },
    ],
    []
  );

  return { projects };
}
