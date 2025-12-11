import ProjectCard from "@/components/project-card";
import { H1, Lead } from "@/components/ui/typography";
import { useProjects } from "@/hooks/useProjects";

export default function ProjectsPage() {
  const { projects } = useProjects();

  return (
    <div className="min-h-screen flex flex-col gap-8">
      <div>
        <H1>Projects</H1>
        <Lead>Here are some of the projects I've worked on.</Lead>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
