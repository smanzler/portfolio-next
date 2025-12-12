"use client";

import { useApps } from "@/hooks/useApps";
import { useProjects } from "@/hooks/useProjects";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection } from "@/lib/utils";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
}

const Footer = ({
  tagline = "Full-stack developer.",
  menuItems = [
    {
      title: "Portfolio",
      links: [
        { text: "Overview", url: "/#home" },
        { text: "Projects", url: "/#projects" },
        { text: "Skills", url: "/#skills" },
        { text: "About", url: "/#about" },
        { text: "Experience", url: "/#experience" },
        { text: "Contact", url: "/#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "GitHub", url: "https://github.com/smanzler" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/smanzler/" },
        { text: "Email", url: "mailto:simanzler@gmail.com" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Simon Manzler. All rights reserved.`,
}: FooterProps) => {
  const { apps } = useApps();
  const { projects } = useProjects();
  const pathname = usePathname();
  const router = useRouter();

  const getBottomLinks = (pathname: string) => {
    if (pathname.startsWith("/apps/")) {
      const appTitle = pathname.split("/")[2];
      return [
        {
          text: "Privacy Policy",
          url: `/apps/${appTitle}/privacy`,
        },
        {
          text: "Terms of Service",
          url: `/apps/${appTitle}/terms`,
        },
      ];
    } else if (pathname === "/apps") {
      return [{ text: "Back to Home", url: "/" }];
    }
    return [];
  };

  const bottomLinks = getBottomLinks(pathname);

  const footerMenuItems: MenuItem[] = [
    ...menuItems,
    {
      title: "Projects",
      links: projects.map((project) => ({
        text: project.title,
        url: `/projects/${project.title}`,
      })),
    },
    {
      title: "Apps",
      links: apps.map((app) => ({
        text: app.title,
        url: `/apps/${app.title}`,
      })),
    },
  ];

  const handleLinkClick = (
    url: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (url.startsWith("/#")) {
      e.preventDefault();
      const sectionId = url.slice(2);

      if (pathname === "/") {
        scrollToSection(sectionId);
      } else {
        router.push(url);
      }
    }
  };

  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Image
                  src="/simon-icon.png"
                  alt="Simon Manzler"
                  title="Simon Manzler"
                  width={40}
                  height={40}
                />
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {footerMenuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="lg:text-right">
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Button
                        className="p-0 h-auto text-muted-foreground hover:text-primary font-medium"
                        variant="link"
                        asChild
                      >
                        <Link
                          href={link.url}
                          onClick={(e) => handleLinkClick(link.url, e)}
                        >
                          {link.text}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
