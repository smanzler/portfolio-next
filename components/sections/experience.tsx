import { H1, H3, Lead, P } from "../ui/typography";
import ThresholdMotionDiv from "../motion/threshold-motion-div";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { AnimateOnThreshold } from "../motion/animate-on-threshold";
import { ThresholdContainer } from "../motion/threshold-container";
import { cn } from "@/lib/utils";
import AccentShadowContainer from "../motion/accent-shadow-container";

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
      "Developing and maintaining software applications for the company.",
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
    achievements: ["Documented the company's software applications."],
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
    achievements: ["Provided support for the company's software applications."],
    technologies: ["SQL Server", "C#", "VB.NET", "React", "TypeScript"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-40">
      <ThresholdMotionDiv>
        <H1>Experience</H1>
        <Lead>Here are some of the companies I've worked with.</Lead>
      </ThresholdMotionDiv>

      <div className="relative mt-16">
        <ThresholdMotionDiv className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-[2px] bg-primary/40" />

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
    <ThresholdContainer className="relative mb-16 last:mb-0">
      {(isPast) => (
        <>
          {/* Timeline dot */}
          <AnimateOnThreshold
            shouldAnimate={isPast}
            className="absolute -left-2.5 md:left-1/2 transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-brand z-10"
          >
            <div className="absolute inset-[3px] rounded-full bg-brand" />
          </AnimateOnThreshold>

          {/* Card container - alternates left/right on desktop */}
          <AnimateOnThreshold shouldAnimate={isPast} delay={0.3}>
            <AccentShadowContainer
              className={cn(
                "relative md:w-[calc(50%-30px)] ml-8 bg-card p-7 rounded-2xl overflow-hidden",
                side === "left"
                  ? "md:ml-auto md:mr-[calc(50%+30px)]"
                  : "md:ml-[calc(50%+30px)]"
              )}
            >
              {/* Header */}
              <div className="space-y-2 mb-5">
                <H3>{experience.role}</H3>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="mr-2" size={16} />
                  <P className="!mt-0">{experience.company}</P>
                </div>
              </div>

              {/* Date and location */}
              <div className="flex flex-wrap gap-4 mb-5">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="mr-2" size={14} />
                  <span>
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="mr-2" size={14} />
                  <span>{experience.location}</span>
                </div>
              </div>

              {/* Achievements */}
              <ul className="space-y-3">
                {experience.achievements.map(
                  (achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex items-start">
                      <span className="inline-block w-2 h-2 mt-2 mr-3 rounded-full bg-primary flex-shrink-0" />
                      <P className="flex-1 !mt-0">{achievement}</P>
                    </li>
                  )
                )}
              </ul>
            </AccentShadowContainer>
          </AnimateOnThreshold>
        </>
      )}
    </ThresholdContainer>
  );
}
