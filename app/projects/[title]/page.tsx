"use client";

import { useProjects } from "@/hooks/useProjects";
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, FileQuestion } from "lucide-react";
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
import { ImageLightbox } from "@/components/image-lightbox";
import { VideoLightbox } from "@/components/video-lightbox";

export default function ProjectDetails() {
  const { title } = useParams();
  const { projects } = useProjects();

  if (!title || typeof title !== "string") {
    redirect("/projects");
  }

  const decodedTitle = decodeURIComponent(title);
  const project = projects.find((project) => project.title === decodedTitle);

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
    <div className="min-h-screen flex flex-col gap-6">
      {/* Hero Section */}
      <AnimateOnThreshold shouldAnimate className="flex flex-col">
        <div className="flex flex-row justify-between items-start">
          <H1>{project.title}</H1>

          {(project.link || project.github) && (
            <div className="flex gap-2 flex-wrap">
              {project.link && (
                <AnimateOnThreshold shouldAnimate delay={0.2}>
                  <Button size="sm" asChild>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Project
                    </Link>
                  </Button>
                </AnimateOnThreshold>
              )}
              {project.github && (
                <AnimateOnThreshold shouldAnimate delay={0.3}>
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
                </AnimateOnThreshold>
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

      {project.image && (
        <AnimateOnThreshold shouldAnimate delay={0.4}>
          <ImageLightbox
            src={project.image}
            alt={project.title}
            className="rounded-lg overflow-hidden border"
          />
        </AnimateOnThreshold>
      )}

      <AnimateOnThreshold shouldAnimate delay={0.5}>
        <H3>Overview</H3>
        <P>{project.longDescription || project.description}</P>
      </AnimateOnThreshold>

      <AnimateOnThreshold shouldAnimate delay={0.6}>
        <H3>Problem & Solution</H3>
        <P>{project.problemAndSolution.problem}</P>
        <P>{project.problemAndSolution.solution}</P>
      </AnimateOnThreshold>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={0.7}>
          <H3>Key Features</H3>
          <UL items={project.keyFeatures} />
        </AnimateOnThreshold>
      )}

      {project.technicalHighlights &&
        project.technicalHighlights.length > 0 && (
          <AnimateOnThreshold shouldAnimate delay={0.8}>
            <H3>Technical Highlights</H3>
            <UL items={project.technicalHighlights} />
          </AnimateOnThreshold>
        )}

      {project.challenges && project.challenges.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={0.9}>
          <H3>Challenges & Learnings</H3>
          {project.challenges.map((challenge, index) => (
            <div key={challenge.problem + index}>
              <P>{challenge.problem}</P>
              <Muted>{challenge.solution}</Muted>
            </div>
          ))}
        </AnimateOnThreshold>
      )}

      {project.productDecisions && project.productDecisions.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={1}>
          <H3>Product Decisions</H3>
          <UL items={project.productDecisions} />
        </AnimateOnThreshold>
      )}
      {project.nextSteps && project.nextSteps.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={1.1}>
          <H3>Product Decisions</H3>
          <UL items={project.nextSteps} />
        </AnimateOnThreshold>
      )}

      {project.assets && project.assets.length > 0 && (
        <AnimateOnThreshold shouldAnimate delay={1.2}>
          <H3>Images</H3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {project.assets?.map((asset, index) =>
              asset.type === "image" ? (
                <ImageLightbox
                  key={index}
                  src={asset.src}
                  alt={`${project.title} ${asset.type} ${index + 1}`}
                />
              ) : asset.type === "video" && typeof asset.src === "string" ? (
                <VideoLightbox
                  key={index}
                  src={asset.src}
                  alt={`${project.title} ${asset.type} ${index + 1}`}
                  fallback={asset.fallback}
                />
              ) : null
            )}
          </div>
        </AnimateOnThreshold>
      )}
      <AnimateOnThreshold shouldAnimate delay={1.3}>
        <Separator className="my-30" />
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-6">
          <div>
            <H2>Interested in this project?</H2>
            <Muted>
              Check out the live demo or view the source code on GitHub.
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
                  View Project
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
    </div>
  );
}
