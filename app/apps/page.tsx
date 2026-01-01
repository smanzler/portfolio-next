import { H1, Lead } from "@/components/ui/typography";
import ProjectCard from "@/components/project-card";
import { getProjects } from "@/lib/projects";

const Apps = () => {
  const apps = getProjects().filter((project) => project.isApp);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col mb-8">
        <H1>Apps</H1>
        <Lead>Here are some of the apps I've worked on.</Lead>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <ProjectCard
            key={app.slug}
            title={app.title}
            description={app.description}
            image={app.icon}
            href={`/apps/${app.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Apps;
