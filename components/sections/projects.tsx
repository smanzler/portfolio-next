import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { H1, Lead } from "@/components/ui/typography";
import FeaturedProjectCard from "@/components/featured-project-card";
import ThresholdMotionDiv from "@/components/motion/threshold-motion-div";
import { ProjectsHeaderButtons } from "@/components/projects-header-buttons";

export default function Projects() {
  const projects = getProjects();

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="min-h-screen py-40 flex flex-col gap-6">
      {/* Featured Projects */}
      <ThresholdMotionDiv className="flex flex-row justify-between">
        <div>
          <H1>Featured Projects</H1>
          <Lead>Some projects I've built.</Lead>
        </div>

        <ProjectsHeaderButtons />
      </ThresholdMotionDiv>

      <div className="flex flex-col gap-6">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            side={index % 2 === 0 ? "left" : "right"}
          />
        ))}
        <ThresholdMotionDiv className="w-fit mx-auto">
          <Button variant="link" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowUpRight />
            </Link>
          </Button>
        </ThresholdMotionDiv>
      </div>
    </section>
  );
}
