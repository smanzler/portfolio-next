"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { cn, scrollToSection } from "@/lib/utils";
import {
  AppWindow,
  Brain,
  Briefcase,
  FolderOpenDot,
  Mail,
  User,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import React from "react";

function MenuItem({
  href,
  icon,
  iconClassName = "size-4 text-primary group-hover/link:text-brand",
  text,
  onClick,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  iconClassName?: string;
  text: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  // Clone the icon element and add the className prop
  const iconWithClassName =
    icon && typeof icon === "object" && "type" in icon
      ? React.cloneElement(icon as React.ReactElement<any>, {
          className: cn(
            (icon as React.ReactElement<any>).props.className,
            iconClassName
          ),
        })
      : icon;

  return (
    <li className={className}>
      <NavigationMenuLink className="group/link h-full" asChild>
        <Link
          href={href}
          onClick={onClick}
          className="flex flex-row items-center gap-2"
        >
          {iconWithClassName}
          {text}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href") || "";
    const id = href.replace(/^\/#?/, "");

    if (pathname === "/") {
      scrollToSection(id);
    } else {
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-5 p-2 flex justify-between items-center">
      <NavigationMenu viewport={isMobile}>
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/" className="flex flex-row items-center gap-2">
                <Image
                  src="/simon-icon.png"
                  alt="Simon Manzler"
                  width={24}
                  height={24}
                  loading="eager"
                />
                {!isMobile && "Portfolio"}
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-cols-2 gap-1 w-[200px]">
                <li className="col-span-2">
                  <NavigationMenuItem asChild>
                    <Link
                      className="bg-transparent focus:bg-muted hover:from-muted/50 hover:to-muted h-30 flex flex-col justify-end rounded-md hover:bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                      href="/#home"
                    >
                      <div>Home</div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        My personal portfolio website.
                      </p>
                    </Link>
                  </NavigationMenuItem>
                </li>

                <MenuItem
                  href="/#projects"
                  className="col-span-2"
                  icon={<FolderOpenDot />}
                  text="Featured Projects"
                  onClick={handleClick}
                />

                <MenuItem
                  href="/#skills"
                  icon={<Brain />}
                  text="Skills"
                  onClick={handleClick}
                />

                <MenuItem
                  href="/#about"
                  icon={<User />}
                  text="About"
                  onClick={handleClick}
                />

                <MenuItem
                  href="/#experience"
                  icon={<Briefcase />}
                  text="Work"
                  onClick={handleClick}
                />

                <MenuItem
                  href="/#contact"
                  icon={<Mail />}
                  text="Contact"
                  onClick={handleClick}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/projects"
              className={cn(
                navigationMenuTriggerStyle(),
                "flex flex-row items-center gap-2"
              )}
            >
              <FolderOpenDot className="size-4 text-primary group-hover/trigger:text-brand" />
              {!isMobile && "Projects"}
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/apps"
              className={cn(
                navigationMenuTriggerStyle(),
                "flex flex-row items-center gap-2"
              )}
            >
              <AppWindow className="size-4 text-primary group-hover/trigger:text-brand" />
              {!isMobile && "Apps"}
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <ModeToggle className="hover:text-brand" />
    </header>
  );
}
