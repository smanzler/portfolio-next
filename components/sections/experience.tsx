"use client";

import { H1, H3, Lead, Muted, P } from "../ui/typography";
import { cn } from "@/lib/utils";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Western & Southern Financial Group",
    role: "Software Developer Intern",
    location: "Cincinnati, OH",
    startDate: "May 2025",
    endDate: "Present",
    description: "",
    achievements: [
      "Implemented the OFAC endpoint, scanning thousands of investment clients against the U.S. sanctions list to ensure compliance.",
      "Developing C# / .NET APIs for investment IT systems to process and analyze securities data.",
      "Writing comprehensive unit tests to increase reliability and reduce production bugs.",
      "Collaborating with cross-functional teams to deliver secure, high-performance solutions.",
    ],
    technologies: ["C#", "ASP.NET", "SQL Server", "Azure", "Docker"],
  },
  {
    id: "exp-2",
    company: "Copeland",
    role: "Computer Science Intern",
    location: "Remote",
    startDate: "Jan 2025",
    endDate: "May 2025",
    description: "",
    achievements: [
      "Supported enterprise content management workflows using OnBase.",
      "Documented and streamlined processes to reduce manual effort.",
    ],
    technologies: ["OnBase", "Windows Server", "PowerShell"],
  },
  {
    id: "exp-3",
    company: "Total Quality Logistics",
    role: "Application Support Intern",
    location: "Cincinnati, OH",
    startDate: "Jan 2024",
    endDate: "May 2024",
    description: "",
    achievements: [
      "Resolved application tickets and performed SQL debugging for production issues.",
      "Built a React-based internal dashboard to automate routine tasks and reduce workload.",
    ],
    technologies: ["SQL Server", "C#", "VB.NET", "React", "TypeScript"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-40">
      <div>
        <H1>Experience</H1>
        <Lead>Here are some of the companies I've worked with.</Lead>
      </div>

      <div className="relative mt-16">
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-[2px] bg-primary/40" />

        <div className="py-40">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              side={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        <div className="absolute left-0 top-0 w-full h-40 bg-gradient-to-b from-background to-transparent" />

        <div className="absolute left-0 bottom-0 w-full h-40 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: ExperienceItem;
  side: "left" | "right";
}

function ExperienceCard({ experience, side }: ExperienceCardProps) {
  return (
    <div className="relative mb-16 last:mb-0">
      {/* Timeline dot */}
      <div className="absolute -left-2.5 md:left-1/2 transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-brand z-10">
        <div className="absolute inset-[3px] rounded-full bg-brand" />
      </div>

      {/* Card container - alternates left/right on desktop */}
      <div
        className={cn(
          "relative md:w-[calc(50%-30px)] ml-8 bg-card p-7 rounded-2xl overflow-hidden",
          side === "left"
            ? "md:ml-auto md:mr-[calc(50%+30px)]"
            : "md:ml-[calc(50%+30px)]"
        )}
      >
        {/* Header */}
        <div className="mb-4">
          <H3>{experience.role}</H3>
          <div className="!mt-0">@ {experience.company}</div>

          <div className="text-muted-foreground text-sm mt-2">
            {experience.startDate} - {experience.endDate}
          </div>
        </div>

        {/* Date and location */}

        {/* Achievements */}
        <ul className="space-y-3">
          {experience.achievements.map((achievement, achievementIndex) => (
            <li key={achievementIndex} className="flex items-start">
              <span className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-primary flex-shrink-0" />
              <P className="flex-1 !mt-0 text-sm">{achievement}</P>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
