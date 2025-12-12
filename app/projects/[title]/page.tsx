"use client";

import { useProjects } from "@/hooks/useProjects";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, FileQuestion } from "lucide-react";
import { H1, H2, H3, Muted, P, UL } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { ThresholdContainer } from "@/components/motion/threshold-container";
import { AnimateOnThreshold } from "@/components/motion/animate-on-threshold";
import { Icon } from "@iconify/react";
import ThresholdMotionDiv from "@/components/motion/threshold-motion-div";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Image from "next/image";

export default function ProjectDetails() {
  const { title } = useParams();
  const { projects } = useProjects();
  const project = projects.find((project) => project.title === title);

  if (!project) {
    return (
      <ThresholdContainer className="min-h-screen">
        {(isPast) => (
          <>
            <AnimateOnThreshold shouldAnimate={isPast} delay={0}>
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
                  Sorry, we couldn't find the project you're looking for. It
                  might have been moved or doesn't exist.
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
          </>
        )}
      </ThresholdContainer>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-6">
      {/* Hero Section */}
      <div className="mb-16">
        <AnimateOnThreshold shouldAnimate className="flex flex-col gap-2">
          <H1>{project.title}</H1>
          {project.role && <Muted>{project.role}</Muted>}
          {project.timeline && <Muted>{project.timeline}</Muted>}
        </AnimateOnThreshold>
        <div className="flex flex-wrap gap-2 my-6">
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
        <div className="flex gap-4 flex-wrap">
          {project.link && (
            <AnimateOnThreshold
              shouldAnimate
              delay={0.2 + project.tags.length * 0.05}
            >
              <Button asChild>
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
            <AnimateOnThreshold
              shouldAnimate
              delay={0.3 + project.tags.length * 0.05}
            >
              <Button asChild variant="outline">
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
      </div>

      {project.image && (
        <AnimateOnThreshold
          shouldAnimate
          delay={0.4 + project.tags.length * 0.05}
          className="mb-20 rounded-lg overflow-hidden border"
        >
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-auto"
          />
        </AnimateOnThreshold>
      )}

      <ThresholdMotionDiv>
        <H3>Overview</H3>
        <P>{project.longDescription || project.description}</P>
      </ThresholdMotionDiv>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <ThresholdMotionDiv>
          <H3>Key Features</H3>
          <UL items={project.keyFeatures} />
        </ThresholdMotionDiv>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <ThresholdMotionDiv>
          <H3>Technologies Used</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            {project.technologies.map((tech, index) => (
              <div key={index}>
                <P>{tech.category}</P>
                <UL items={tech.items} />
              </div>
            ))}
          </div>
        </ThresholdMotionDiv>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <ThresholdMotionDiv>
          <H3>Challenges & Learnings</H3>
          <UL items={project.challenges} />
        </ThresholdMotionDiv>
      )}

      {project.images && project.images.length > 1 && (
        <ThresholdMotionDiv>
          <H3>Gallery</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden border">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 2}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </ThresholdMotionDiv>
      )}

      <ThresholdMotionDiv>
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
      </ThresholdMotionDiv>
    </div>
  );
}
