import type { Project } from "@/hooks/useProjects";
import { useNavigate } from "react-router";
import { H4, P } from "./typography";
import { Badge } from "./badge";
import { Button } from "./button";
import { Code } from "lucide-react";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ThresholdMotionDiv from "../motion/threshold-motion-div";
import AccentShadowContainer from "../motion/accent-shadow-container";

const FeaturedProjectCard = ({
  project,
  side = "left",
}: {
  project: Project;
  side?: "left" | "right";
}) => {
  const navigate = useNavigate();

  return (
    <ThresholdMotionDiv
      key={project.title}
      onClick={() => navigate(`/projects/${project.title}`)}
    >
      <AccentShadowContainer className="relative cursor-pointer rounded-xl overflow-hidden">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full min-h-[450px] md:min-h-[500px] object-cover"
          />
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

            <div className="flex gap-2 justify-end">
              {project.github ? (
                <Button
                  variant="ghost"
                  size="icon"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.title}`);
                  }}
                >
                  <MoveRight />
                </Button>
              )}
            </div>
          </div>
        </ThresholdMotionDiv>
      </AccentShadowContainer>
    </ThresholdMotionDiv>
  );
};

export default FeaturedProjectCard;
