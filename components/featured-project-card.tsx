"use client";

import type { Project } from "@/hooks/useProjects";
import { useRouter } from "next/navigation";
import { H4, P } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ThresholdMotionDiv from "@/components/motion/threshold-motion-div";
import AccentShadowContainer from "@/components/motion/accent-shadow-container";
import Link from "next/link";
import Image from "next/image";
import { AssetThumbnail } from "./asset-thumbnail";

const FeaturedProjectCard = ({
  project,
  side = "left",
}: {
  project: Project;
  side?: "left" | "right";
}) => {
  const router = useRouter();

  return (
    <ThresholdMotionDiv
      key={project.title}
      onClick={() => router.push(`/projects/${project.title}`)}
    >
      <AccentShadowContainer className="relative cursor-pointer rounded-xl overflow-hidden">
        {project.heroAsset && (
          <AssetThumbnail asset={project.heroAsset} className="border-none" />
        )}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black to-transparent",
            side === "left" ? "bg-gradient-to-tr" : "bg-gradient-to-tl"
          )}
        ></div>

        <ThresholdMotionDiv
          className={cn(
            "absolute bottom-6 z-1 right-6 left-6 md:w-[400px] flex flex-col justify-between gap-3 p-6 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-300/40 dark:supports-[backdrop-filter]:bg-neutral-700/40 rounded-xl",
            side === "left"
              ? "md:left-6 md:right-auto"
              : "md:right-6 md:left-auto"
          )}
        >
          <div className="flex flex-col gap-2">
            <H4>{project.title}</H4>
            <P className="line-clamp-3">{project.description}</P>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </ThresholdMotionDiv>
      </AccentShadowContainer>
    </ThresholdMotionDiv>
  );
};

export default FeaturedProjectCard;
