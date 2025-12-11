import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useProjects } from "@/hooks/useProjects";
import { H1, Lead } from "../ui/typography";
import FeaturedProjectCard from "../ui/featured-project-card";
import ThresholdMotionDiv from "../motion/threshold-motion-div";

export default function Projects() {
  const { projects } = useProjects();

  const featuredProjects = projects.filter((project) => project.featured);

  const navigate = useNavigate();

  return (
    <section id="projects" className="min-h-screen py-40 flex flex-col gap-6">
      {/* Featured Projects */}
      <ThresholdMotionDiv className="flex flex-row justify-between">
        <div>
          <H1>Featured Projects</H1>
          <Lead>Some projects I've built.</Lead>
        </div>

        <div>
          <Button variant="link" onClick={() => navigate("/projects")}>
            View All Projects
            <ArrowRight />
          </Button>
          <Button variant="link" onClick={() => navigate("/apps")}>
            View All Apps
            <ArrowRight />
          </Button>
        </div>
      </ThresholdMotionDiv>

      <div className="flex flex-col gap-6">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project.title}
            project={project}
            side={index % 2 === 0 ? "left" : "right"}
          />
        ))}
        <ThresholdMotionDiv className="w-fit mx-">
          <Button variant="link" onClick={() => navigate("/projects")}>
            View All Projects
            <ArrowRight />
          </Button>
        </ThresholdMotionDiv>
      </div>
    </section>
  );
}
