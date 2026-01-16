import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { H1, Lead } from "@/components/ui/typography";
import { ProjectsHeaderButtons } from "@/components/projects-header-buttons";
import FeaturedProjectCard from "../featured-project-card";
import Section from "../section";

export default function Projects() {
  const projects = getProjects();

  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <Section id="projects">
      <div className="flex flex-row justify-between">
        <div>
          <H1>Projects</H1>
          <Lead>Some projects I've built.</Lead>
        </div>

        <ProjectsHeaderButtons />
      </div>

      <div className="grid gap-6">
        {featuredProjects.map((project) => {
          return <FeaturedProjectCard key={project.slug} project={project} />;
        })}
      </div>

      <div className="w-fit mx-auto">
        <Button variant="link" asChild>
          <Link href="/projects">
            View All Projects
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
