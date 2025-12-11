import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { H1, H2, H4, Muted, P, UL } from "../ui/typography";
import { Separator } from "../ui/separator";
import { useApps } from "@/hooks/useApps";
import { AnimateOnThreshold } from "../motion/animate-on-threshold";
import ThresholdMotionDiv from "../motion/threshold-motion-div";

const Policy = ({ type }: { type: "privacy" | "terms" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apps } = useApps();
  const item = apps.find((app) => app.title === id);

  const policy =
    type === "privacy" ? item?.privacyPolicy : item?.termsOfService;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, type]);

  if (!policy || !item) {
    return (
      <div className="min-h-screen">
        <AnimateOnThreshold shouldAnimate delay={0}>
          <Button
            onClick={() => navigate("/apps")}
            variant="ghost"
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apps
          </Button>
        </AnimateOnThreshold>

        <div className="flex flex-col items-center text-center justify-center py-20 gap-6">
          <AnimateOnThreshold shouldAnimate delay={0.1}>
            <H1>
              {type === "privacy" ? "Privacy Policy" : "Terms of Service"} Not
              Found
            </H1>
            <P>
              Sorry, we couldn't find the app you're looking for. It might have
              been moved or doesn't exist.
            </P>
          </AnimateOnThreshold>
          <AnimateOnThreshold shouldAnimate delay={0.2}>
            <Button asChild>
              <Link to="/apps">
                <ArrowLeft className="h-4 w-4" />
                View All Apps
              </Link>
            </Button>
          </AnimateOnThreshold>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6">
        <AnimateOnThreshold shouldAnimate delay={0}>
          <H1>{type === "privacy" ? "Privacy Policy" : "Terms of Service"}</H1>
        </AnimateOnThreshold>
        <div className="flex flex-row justify-between gap-4 items-end">
          <AnimateOnThreshold shouldAnimate delay={0.1}>
            <Link to={`/apps/${item.title}`}>
              <H2 className="hover:underline">{item.title}</H2>
            </Link>
            <Muted>Last updated: {policy.lastUpdated}</Muted>
          </AnimateOnThreshold>
          <AnimateOnThreshold
            shouldAnimate
            delay={0.2}
            className="size-16 shrink-0 rounded-lg overflow-hidden"
          >
            <Link to={`/apps/${item.title}`}>
              <img
                src={item.image}
                alt={item.title}
                className="size-full object-cover"
              />
            </Link>
          </AnimateOnThreshold>
        </div>
        <AnimateOnThreshold shouldAnimate delay={0.3}>
          <Separator />
        </AnimateOnThreshold>
        {policy.sections.map((section, index) => (
          <ThresholdMotionDiv key={index}>
            <H4>{section.title}</H4>
            {section.content.map((content, index) =>
              typeof content === "string" ? (
                <P key={index}>{content}</P>
              ) : (
                <UL key={index} items={content} />
              )
            )}
          </ThresholdMotionDiv>
        ))}
      </div>
    </div>
  );
};

export default Policy;
