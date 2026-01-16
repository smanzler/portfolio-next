import Link from "next/link";
import { H4, Muted } from "./ui/typography";
import Image from "next/image";
import TechIcon from "./tech-icon";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedProjectCard({
  title,
  description,
  image,
  href,
  tech,
}: {
  title: string;
  description: string;
  image?: string;
  href: string;
  tech: string[];
}) {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col gap-1 items-center justify-center">
        {image && (
          <div className="rounded-lg overflow-hidden bg-muted size-16">
            <Image src={image} alt={title} width={64} height={64} />
          </div>
        )}
        <Muted className="text-xs">{title}</Muted>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex flex-row justify-between items-center gap-2">
            <H4>{title}</H4>
            <div className="flex flex-row gap-2">
              {tech.map((tech) => (
                <TechIcon key={tech} name={tech} />
              ))}
            </div>
          </div>
          <Muted className="line-clamp-3">{description}</Muted>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" asChild>
            <Link href={href}>
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
