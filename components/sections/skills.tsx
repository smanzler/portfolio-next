"use client";

import AccentShadowContainer from "../motion/accent-shadow-container";
import { AnimateOnThreshold } from "../motion/animate-on-threshold";
import { ThresholdContainer } from "../motion/threshold-container";
import ThresholdMotionDiv from "../motion/threshold-motion-div";
import { H1, Lead, Muted } from "../ui/typography";
import { Icon } from "@iconify/react";

export const skills = [
  { name: "React / Next.js", icon: "devicon:react" },
  { name: "TypeScript", icon: "devicon:typescript" },
  { name: "TailwindCSS", icon: "devicon:tailwindcss" },
  { name: "HTML5 / CSS3", icon: "devicon:html5" },
  { name: "Zustand", icon: "devicon:zustand" },
  { name: "Node.js", icon: "devicon:nodejs" },
  { name: "Python", icon: "devicon:python" },
  { name: "PostgreSQL", icon: "devicon:postgresql" },
  { name: "Docker", icon: "devicon:docker" },
  { name: "Supabase", icon: "devicon:supabase" },
  { name: "Expo", icon: "file-icons:expo" },
  { name: "React Native", icon: "devicon:reactnative-wordmark" },
  { name: ".NET", icon: "logos:dotnet" },
  { name: "C#", icon: "devicon:csharp" },
  { name: "Swift", icon: "devicon:swift" },
];

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-40 flex flex-col gap-6">
      <ThresholdMotionDiv>
        <H1>Skills</H1>
        <Lead>Tools and tech I use most.</Lead>
      </ThresholdMotionDiv>

      <ThresholdContainer className="flex flex-wrap justify-center gap-4">
        {(isPast) =>
          skills.map((skill, index) => (
            <AnimateOnThreshold
              key={index}
              shouldAnimate={isPast}
              delay={0.03 * index}
              className="w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2*1rem)/3)] lg:w-[calc((100%-4*1rem)/5)]"
            >
              <AccentShadowContainer className="flex flex-col items-center justify-center gap-2 bg-card rounded-lg p-4">
                <Icon icon={skill.icon} className="w-10 h-10" />
                <Muted>{skill.name}</Muted>
              </AccentShadowContainer>
            </AnimateOnThreshold>
          ))
        }
      </ThresholdContainer>
    </section>
  );
};

export default Skills;
