import { useApps } from "@/hooks/useApps";
import { H1, Lead } from "@/components/ui/typography";
import ProjectCard from "@/components/project-card";

const Apps = () => {
  const { apps } = useApps();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col mb-8">
        <H1>Apps</H1>
        <Lead>Here are some of the apps I've worked on.</Lead>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <ProjectCard
            key={app.title}
            title={app.title}
            description={app.description}
            image={app.image}
            href={`/apps/${app.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Apps;
