import { H1, H4, Lead, Muted } from "@/components/ui/typography";
import { getProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="min-h-screen flex flex-col gap-8">
      <div>
        <H1>Projects</H1>
        <Lead>Here are some of the projects I've worked on.</Lead>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.title}
            className="relative flex flex-row cursor-pointer gap-6 group"
            href={`/projects/${project.slug}`}
          >
            <div className="absolute -inset-3 bg-accent dark:bg-input/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200 pointer-events-none z-0" />
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="rounded-lg overflow-hidden bg-muted size-16">
                <Image
                  src={project.icon}
                  alt={project.title}
                  className="h-full w-auto"
                />
              </div>
              <Muted className="text-xs">{project.title}</Muted>
            </div>
            <div className="flex flex-col gap-2">
              <H4>{project.title}</H4>
              <Muted className="line-clamp-3">{project.description}</Muted>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
