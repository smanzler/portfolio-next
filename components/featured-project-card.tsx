"use client";

import type { Project } from "@/lib/projects";
import { useRouter } from "next/navigation";
import { H4, P } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ThresholdMotionDiv from "@/components/motion/threshold-motion-div";
import AccentShadowContainer from "@/components/motion/accent-shadow-container";
import { AssetThumbnail } from "./asset-thumbnail";
import { useIsMobile } from "@/hooks/useIsMobile";

const FeaturedProjectCard = ({
  project,
  side = "left",
}: {
  project: Project;
  side?: "left" | "right";
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <ThresholdMotionDiv
      className="cursor-pointer"
      onClick={() => router.push(`/projects/${project.slug}`)}
    >
      <AccentShadowContainer className="rounded-xl border overflow-hidden relative">
        {project.heroAsset && (
          <AssetThumbnail
            asset={project.heroAsset}
            className="border-none overflow-hidden rounded-xl aspect-[3/2]"
          />
        )}
        {!isMobile && (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black to-transparent rounded-xl",
              side === "left" ? "bg-gradient-to-tl" : "bg-gradient-to-tr"
            )}
          />
        )}
        <ThresholdMotionDiv
          className={cn(
            !isMobile &&
              `absolute z-1 bottom-6 ${side === "left" ? "right-6" : "left-6"}`,
            "md:w-[400px] flex flex-col justify-between gap-3 p-6 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-300/40 dark:supports-[backdrop-filter]:bg-neutral-700/40 rounded-xl"
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
