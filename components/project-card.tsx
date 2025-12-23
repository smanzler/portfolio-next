import Link from "next/link";
import { H4, Muted } from "./ui/typography";
import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image?: string;
  href: string;
}) {
  return (
    <Link
      className="relative flex flex-row cursor-pointer gap-6 group z-0"
      href={href}
    >
      <div className="absolute -inset-3 bg-accent dark:bg-input opacity-0 group-hover:opacity-100 rounded-xl pointer-events-none -z-1" />
      <div className="flex flex-col gap-1 items-center justify-center">
        {image && (
          <div className="rounded-lg overflow-hidden bg-muted size-16">
            <Image src={image} alt={title} width={64} height={64} />
          </div>
        )}
        <Muted className="text-xs">{title}</Muted>
      </div>
      <div className="flex flex-col gap-2">
        <H4>{title}</H4>
        <Muted className="line-clamp-3">{description}</Muted>
      </div>
    </Link>
  );
}
