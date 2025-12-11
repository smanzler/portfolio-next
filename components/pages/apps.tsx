import { useNavigate } from "react-router";
import { useApps } from "@/hooks/useApps";
import { useEffect } from "react";
import { H1, H4, Lead, Muted } from "../ui/typography";

const Apps = () => {
  const navigate = useNavigate();
  const { apps } = useApps();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col mb-8">
        <H1>Apps</H1>
        <Lead>Here are some of the apps I've worked on.</Lead>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <div
            key={app.title}
            className="relative flex flex-row cursor-pointer gap-6 group"
            onClick={() => navigate(`/apps/${app.title}`)}
          >
            <div className="absolute -top-4 -right-4 -bottom-4 -left-4 bg-accent dark:bg-input/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200 pointer-events-none z-0" />
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="relative z-1 rounded-lg overflow-hidden bg-muted w-16 h-16">
                <img
                  src={app.image}
                  alt={app.title}
                  className="object-cover w-full h-full object-center"
                />
              </div>
              <Muted className="text-xs">{app.title}</Muted>
            </div>
            <div className="flex flex-col gap-2">
              <H4>{app.title}</H4>
              <Muted className="line-clamp-3">{app.description}</Muted>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
