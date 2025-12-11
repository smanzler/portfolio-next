import { useProjects } from "@/hooks/useProjects";
import { useParams, useNavigate, Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { H1, H2, H3, Muted, P, UL } from "../ui/typography";
import { Separator } from "../ui/separator";
import { ThresholdContainer } from "../motion/threshold-container";
import { AnimateOnThreshold } from "../motion/animate-on-threshold";
import { Icon } from "@iconify/react";
import ThresholdMotionDiv from "../motion/threshold-motion-div";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const project = projects.find((project) => project.title === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <ThresholdContainer className="min-h-screen">
        {(isPast) => (
          <>
            <AnimateOnThreshold shouldAnimate={isPast} delay={0}>
              <Button
                onClick={() => navigate("/", { state: { id: "projects" } })}
                variant="ghost"
                className="mb-8 p-0"
              >
                <ArrowLeft />
                Back to Projects
              </Button>
            </AnimateOnThreshold>

            <div className="flex flex-col items-center text-center justify-center py-20 gap-6">
              <AnimateOnThreshold shouldAnimate={isPast} delay={0.2}>
                <H1>Project Not Found</H1>
                <P>
                  Sorry, we couldn't find the project you're looking for. It
                  might have been moved or doesn't exist.
                </P>
              </AnimateOnThreshold>
              <AnimateOnThreshold shouldAnimate={isPast} delay={0.3}>
                <Button asChild>
                  <Link to="/" state={{ id: "projects" }}>
                    <ArrowLeft className="h-4 w-4" />
                    View All Projects
                  </Link>
                </Button>
              </AnimateOnThreshold>
            </div>
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
                  to={project.link}
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
          <img
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
                <img
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
};

export default ProjectDetails;
