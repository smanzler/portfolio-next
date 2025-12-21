"use client";

import { useProjects } from "@/hooks/useProjects";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  FileQuestion,
  GalleryVertical,
  LayoutGrid,
  LayoutList,
  Play,
  CirclePlay,
} from "lucide-react";
import { H1, H2, H3, Muted, P, UL } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { AnimateOnThreshold } from "@/components/motion/animate-on-threshold";
import { Icon } from "@iconify/react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AssetLightboxDialog } from "@/components/asset-lightbox-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import Image from "next/image";
import { AssetThumbnail } from "@/components/asset-thumbnail";

export default function ProjectDetails() {
  const { title } = useParams();
  const { projects } = useProjects();
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  if (!title || typeof title !== "string") {
    redirect("/projects");
  }
  const decodedTitle = decodeURIComponent(title);
  const project = projects.find((project) => project.title === decodedTitle);

  const handleLightboxOpen = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen">
        <AnimateOnThreshold shouldAnimate delay={0}>
          <Button variant="ghost" className="mb-8 p-0" asChild>
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </AnimateOnThreshold>

        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestion />
            </EmptyMedia>
            <EmptyTitle>Project Not Found</EmptyTitle>
            <EmptyDescription>
              Sorry, we couldn't find the project you're looking for. It might
              have been moved or doesn't exist.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                View All Projects
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 py-40">
      {/* Hero Section */}
      <AnimateOnThreshold shouldAnimate className="flex flex-col">
        <div className="flex flex-row justify-between items-start">
          <H1>{project.title}</H1>

          {(project.link || project.github) && (
            <div className="flex gap-2 flex-wrap">
              {project.link && (
                <Button size="sm" asChild>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </Link>
                </Button>
              )}
              {project.github && (
                <Button size="sm" asChild variant="outline">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon="line-md:github" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between gap-2">
          <Muted>{project.description}</Muted>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, index) => (
            <AnimateOnThreshold
              key={tag}
              shouldAnimate
              delay={0.1 + index * 0.05}
            >
              <Badge variant="secondary" className="text-xs">
                {tag}
              </Badge>
            </AnimateOnThreshold>
          ))}
        </div>
      </AnimateOnThreshold>

      <AnimateOnThreshold shouldAnimate delay={0.4}>
        <div className="rounded-lg overflow-hidden border">
          {project.heroAsset && (
            <AssetThumbnail
              asset={project.heroAsset}
              onClick={() => handleLightboxOpen(0)}
            />
          )}
        </div>
      </AnimateOnThreshold>

      <AnimateOnThreshold shouldAnimate delay={0.5}>
        <H3>Overview</H3>
        <P>{project.longDescription || project.description}</P>
      </AnimateOnThreshold>

      {project.assets && project.assets.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={0.6}>
          <div className="flex flex-col gap-2">
            <Tabs defaultValue="large">
              <div className="flex flex-row justify-between items-center">
                <H3>Media Gallery</H3>
                <TabsList>
                  <Tooltip>
                    <TabsTrigger value="large" asChild>
                      <TooltipTrigger>
                        <GalleryVertical />
                      </TooltipTrigger>
                    </TabsTrigger>
                    <TooltipContent>Vertical Gallery</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TabsTrigger value="grid" asChild>
                      <TooltipTrigger>
                        <LayoutGrid />
                      </TooltipTrigger>
                    </TabsTrigger>
                    <TooltipContent>Grid View</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TabsTrigger value="details" asChild>
                      <TooltipTrigger>
                        <LayoutList />
                      </TooltipTrigger>
                    </TabsTrigger>
                    <TooltipContent>Details</TooltipContent>
                  </Tooltip>
                </TabsList>
              </div>
              <TabsContent value="large">
                <div
                  className={
                    project.isApp
                      ? "grid grid-cols-2 gap-4"
                      : "flex flex-col gap-2"
                  }
                >
                  {project.assets.map((asset, index) => (
                    <AssetThumbnail
                      key={index}
                      asset={asset}
                      onClick={() => handleLightboxOpen(index + 1)}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="flex flex-col gap-2">
                  <Separator />
                  {project.assets.map((asset, index) => (
                    <React.Fragment key={index}>
                      <div
                        className="group cursor-pointer flex flex-row gap-2 items-center justify-between"
                        onClick={() => handleLightboxOpen(index + 1)}
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <P className="group-hover:text-primary/80 transition-colors">
                            {asset.alt ||
                              (asset.type === "image" &&
                              typeof asset.src === "object"
                                ? asset.src.src
                                : String(asset.src))}
                          </P>
                          {asset.type === "video" && (
                            <CirclePlay className="h-4 w-4" />
                          )}
                        </div>
                        {asset.type === "image" &&
                        typeof asset.src === "object" ? (
                          <Image
                            src={asset.src}
                            alt={asset.alt || asset.src.src}
                            className="h-8 w-auto"
                          />
                        ) : asset.fallback ? (
                          <Image
                            src={asset.fallback}
                            alt={asset.alt || String(asset.src)}
                            className="h-8 w-auto"
                          />
                        ) : null}
                      </div>
                      <Separator />
                    </React.Fragment>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="grid">
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {project.assets.map((asset, index) => (
                    <AssetThumbnail
                      key={index}
                      asset={asset}
                      onClick={() => handleLightboxOpen(index + 1)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </AnimateOnThreshold>
      )}

      <AnimateOnThreshold shouldAnimate delay={0.7}>
        <H3>Problem & Solution</H3>
        <P>{project.problemAndSolution.problem}</P>
        <P>{project.problemAndSolution.solution}</P>
      </AnimateOnThreshold>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={0.8}>
          <H3>Key Features</H3>
          <UL items={project.keyFeatures} />
        </AnimateOnThreshold>
      )}

      {project.technicalHighlights &&
        project.technicalHighlights.length > 0 && (
          <AnimateOnThreshold shouldAnimate delay={0.9}>
            <H3>Technical Highlights</H3>
            <UL items={project.technicalHighlights} />
          </AnimateOnThreshold>
        )}

      {project.challenges && project.challenges.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={1}>
          <H3>Challenges & Learnings</H3>
          {project.challenges.map((challenge, index) => (
            <P key={challenge.problem + index} className="mt-2">
              <span className="font-bold">{challenge.problem}</span>
              {" - "}
              {challenge.solution}
            </P>
          ))}
        </AnimateOnThreshold>
      )}

      {project.productDecisions && project.productDecisions.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={1.1}>
          <H3>Product Decisions</H3>
          <UL items={project.productDecisions} />
        </AnimateOnThreshold>
      )}
      {project.nextSteps && project.nextSteps.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={1.2}>
          <H3>Next Steps</H3>
          <UL items={project.nextSteps} />
        </AnimateOnThreshold>
      )}
      {(project.link || project.github) && (
        <AnimateOnThreshold shouldAnimate delay={1.4}>
          <Separator className="my-30" />
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-6">
            <div>
              <H2>Interested in this project?</H2>
              <Muted>
                Check out {project.link && "the live demo"}
                {project.link && project.github && " or view "}
                {project.github && "the source code on GitHub"}
              </Muted>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              {project.link && (
                <Button asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.github && (
                <Button asChild variant="outline">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </AnimateOnThreshold>
      )}

      {/* Lightbox modal */}
      {project.assets && project.assets.length > 0 && (
        <AssetLightboxDialog
          assets={[project.heroAsset, ...project.assets]}
          open={lightboxOpen}
          setOpen={setLightboxOpen}
          initialIndex={lightboxIndex}
        />
      )}
    </div>
  );
}
