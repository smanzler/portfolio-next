"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";
import AccentShadowContainer from "../motion/accent-shadow-container";
import { skills } from "./skills";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { scrollToSection } from "@/lib/utils";

export default function Hero() {
  const SkillItem = ({ skill }: { skill: (typeof skills)[0] }) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <AccentShadowContainer
            className="p-2 mr-4 rounded-lg cursor-pointer"
            onClick={() => scrollToSection("skills")}
          >
            <Icon icon={skill.icon} className="w-10 h-10" />
          </AccentShadowContainer>
        </TooltipTrigger>
        <TooltipContent>{skill.name}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col text-center items-center justify-center max-w-xl mx-auto -mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <Avatar className="size-50 mb-4 rounded-full overflow-hidden relative">
          <AvatarImage
            src="/simon.jpeg"
            alt="Simon Manzler"
            width={200}
            height={200}
          />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-1"
      >
        Simon Manzler
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-muted-foreground md:text-xl lg:text-2xl mb-8"
      >
        Building modern, responsive, and user-friendly web and mobile
        applications
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative w-full overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-1 pointer-events-none" />

        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-1 pointer-events-none" />

        <div className="flex">
          <div className="flex animate-infinite-scroll">
            {skills.map((skill, index) => (
              <SkillItem key={`${skill.name}-${index}`} skill={skill} />
            ))}
          </div>
          <div className="flex animate-infinite-scroll" aria-hidden="true">
            {skills.map((skill, index) => (
              <SkillItem
                key={`${skill.name}-duplicate-${index}`}
                skill={skill}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes infinite-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100%);
            }
          }
          
          .animate-infinite-scroll {
            animation: infinite-scroll 20s linear infinite;
          }
        `}</style>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 + skills.length * 0.1 }}
        className="mt-12"
      >
        <AccentShadowContainer hoverOffset={6} asChild>
          <Button onClick={() => scrollToSection("projects")}>
            View Projects
            <ArrowRight />
          </Button>
        </AccentShadowContainer>
      </motion.div>
    </section>
  );
}
