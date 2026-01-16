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
    <div className="relative">
      {project.heroAsset && (
        <AssetThumbnail
          asset={project.heroAsset}
          className="border-none overflow-hidden rounded-xl aspect-[3/2] bg-black"
        />
      )}
      {isMobile ? (
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-xl" />
      ) : (
        <div
          className={cn(
            "absolute inset-0 from-black to-transparent rounded-xl",
            side === "left" ? "bg-gradient-to-tl" : "bg-gradient-to-tr"
          )}
        />
      )}
      <div
        className={cn(
          "absolute z-1 bottom-0 text-white flex flex-col gap-4 p-8 md:p-16 lg:p-20",
          !isMobile ? (side === "left" ? "right-0" : "left-0") : "flex-1"
        )}
      >
        <div>
          <div className="flex flex-row justify-between items-center gap-2 lg:mb-4">
            <H4 className="text-3xl lg:text-4xl">{project.title}</H4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <P className="line-clamp-3 text-white/80">{project.description}</P>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
