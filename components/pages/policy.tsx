"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { H1, H2, H4, Muted, P, UL } from "../ui/typography";
import { Separator } from "../ui/separator";
import { useApps } from "@/hooks/useApps";
import { AnimateOnThreshold } from "../motion/animate-on-threshold";
import ThresholdMotionDiv from "../motion/threshold-motion-div";

const Policy = ({ type }: { type: "privacy" | "terms" }) => {
  const { title } = useParams();
  const { apps } = useApps();
  const item = apps.find((app) => app.title === title);

  const policy =
    type === "privacy" ? item?.privacyPolicy : item?.termsOfService;

  if (!policy || !item) {
    return (
      <div className="min-h-screen">
        <AnimateOnThreshold shouldAnimate delay={0}>
          <Button variant="ghost" className="mb-8" asChild>
            <Link href="/apps">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Apps
            </Link>
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
              <Link href="/apps">
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
            <Link href={`/apps/${item.title}`}>
              <H2 className="hover:underline">{item.title}</H2>
            </Link>
            <Muted>Last updated: {policy.lastUpdated}</Muted>
          </AnimateOnThreshold>
          <AnimateOnThreshold
            shouldAnimate
            delay={0.2}
            className="size-16 shrink-0 rounded-lg overflow-hidden"
          >
            <Link href={`/apps/${item.title}`}>
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
