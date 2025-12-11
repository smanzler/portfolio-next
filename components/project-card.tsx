"use client";

import type { Project } from "@/hooks/useProjects";
import { H4, P } from "./ui/typography";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Code } from "lucide-react";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import ThresholdMotionDiv from "./motion/threshold-motion-div";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();
  return (
    <ThresholdMotionDiv
      className="relative group cursor-pointer rounded-xl overflow-hidden"
      onClick={() => router.push(`/projects/${project.title}`)}
    >
      <div className="absolute inset-0 bg-muted">
        {project.image && (
          <Image
            src={project.image}
            width={500}
            height={500}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-107"
            style={{
              imageRendering: "auto",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />
        )}
      </div>

      <div className="relative z-1 h-full flex flex-col justify-between gap-3 p-6 text-white backdrop-blur-sm supports-[backdrop-filter]:bg-black/50  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2">
          <H4 className="!text-white">{project.title}</H4>
          <P className="line-clamp-3 !text-white/90">{project.description}</P>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                className="text-xs bg-white/20 text-white border-white/30"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 justify-end">
            {project.github ? (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, "_blank");
                }}
              >
                <Code />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 hover:text-white"
              >
                <Link href={`/projects/${project.title}`}>
                  <MoveRight />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </ThresholdMotionDiv>
  );
};

export default ProjectCard;
