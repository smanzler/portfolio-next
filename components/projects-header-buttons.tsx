"use client";

import { AppWindow, ArrowUpRight, FolderOpenDot } from "lucide-react";
import Link from "next/link";
import { ResponsiveButton } from "@/components/responsive-button";

export function ProjectsHeaderButtons() {
  return (
    <div className="flex gap-2">
      <ResponsiveButton
        size="sm"
        asChild
        variant={{ mobile: "ghost", desktop: "link" }}
        icon={({ isMobile }) =>
          isMobile ? <FolderOpenDot /> : <ArrowUpRight />
        }
        iconSide="right"
        className="flex-1 flex items-center justify-center rounded-md"
      >
        <Link href="/projects">View All Projects</Link>
      </ResponsiveButton>
      <ResponsiveButton
        size="sm"
        asChild
        variant={{ mobile: "ghost", desktop: "link" }}
        icon={({ isMobile }) => (isMobile ? <AppWindow /> : <ArrowUpRight />)}
        className="flex-1 flex items-center justify-center rounded-md"
        iconSide="right"
      >
        <Link href="/apps">View All Apps</Link>
      </ResponsiveButton>
    </div>
  );
}
