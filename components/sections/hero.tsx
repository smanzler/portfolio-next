"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AccentShadowContainer from "../motion/accent-shadow-container";
import { skills } from "./skills";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { scrollToSection } from "@/lib/utils";
import { AnimateOnThreshold } from "../motion/animate-on-threshold";

const SkillItem = ({ skill }: { skill: (typeof skills)[0] }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <AccentShadowContainer
          className="p-2 rounded-lg cursor-pointer flex-shrink-0"
          onClick={() => scrollToSection("skills")}
        >
          <Icon icon={skill.icon} className="w-10 h-10" />
        </AccentShadowContainer>
      </TooltipTrigger>
      <TooltipContent>{skill.name}</TooltipContent>
    </Tooltip>
  );
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col text-center items-center justify-center max-w-xl mx-auto -mt-20"
    >
      <AnimateOnThreshold shouldAnimate delay={0.2}>
        <Avatar className="size-50 mb-4 rounded-full overflow-hidden relative">
          <AvatarImage
            src="/simon.jpeg"
            alt="Simon Manzler"
            width={200}
            height={200}
            loading="eager"
          />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
      </AnimateOnThreshold>

      <AnimateOnThreshold
        shouldAnimate
        delay={0.4}
        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-1"
      >
        Simon Manzler
      </AnimateOnThreshold>
      <AnimateOnThreshold
        shouldAnimate
        delay={0.6}
        className="text-muted-foreground md:text-xl lg:text-2xl mb-8"
      >
        Building modern, responsive, and user-friendly web and mobile
        applications
      </AnimateOnThreshold>
      <AnimateOnThreshold
        shouldAnimate
        delay={0.8}
        className="relative w-full overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-1 pointer-events-none" />

        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-1 pointer-events-none" />

        <div className="flex animate-marquee w-[2200px] flex-row justify-between">
          {[...skills, ...skills].map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
          <div className="w-0" />
        </div>
      </AnimateOnThreshold>
      <AnimateOnThreshold shouldAnimate delay={1} className="mt-12">
        <AccentShadowContainer hoverOffset={6} className="rounded-md">
          <Button onClick={() => scrollToSection("projects")}>
            View Projects
            <ArrowRight />
          </Button>
        </AccentShadowContainer>
      </AnimateOnThreshold>
    </section>
  );
}
