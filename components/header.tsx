"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { cn, scrollToSection } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  AppWindow,
  Brain,
  Briefcase,
  FolderOpenDot,
  Mail,
  User,
} from "lucide-react";
import { motion, useScroll } from "motion/react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const lastVisibilityChangeY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const isScrolledNow = latest > 50;
      const isScrollingDown = latest > lastScrollY.current;
      const scrollDelta = latest - lastVisibilityChangeY.current;

      // Always show header when near top
      if (!isScrolledNow) {
        setIsVisible(true);
        lastVisibilityChangeY.current = latest;
      } else {
        // When scrolling up, show immediately
        if (!isScrollingDown) {
          setIsVisible(true);
          lastVisibilityChangeY.current = latest;
        } else {
          // When scrolling down, only hide after 50px delay
          if (scrollDelta >= 50) {
            setIsVisible(false);
            lastVisibilityChangeY.current = latest;
          }
        }
      }

      setIsScrolled(isScrolledNow);
      lastScrollY.current = latest;
    });
  }, [scrollY]);

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
    <motion.header
      className="fixed top-0 left-1/2 -translate-x-1/2 z-5 w-full max-w-3xl px-6"
      initial={{ top: "-80px" }}
      animate={{
        top: isScrolled ? (isVisible ? "20px" : "-80px") : "0",
      }}
      transition={{ duration: 0.4, ease: [0.1, 0.6, 0.3, 0.95] }}
    >
      <motion.div
        className={cn(
          "rounded-full transition-colors flex justify-between items-center w-full",
          isScrolled
            ? "bg-card shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,1)] backdrop-blur-lg supports-[backdrop-filter]:bg-neutral-400/40 dark:supports-[backdrop-filter]:bg-neutral-700/40"
            : "bg-background"
        )}
        animate={{
          padding: isScrolled ? "4px 24px" : "4px 0px",
        }}
        transition={{ duration: 0.3, ease: [0.1, 0.6, 0.3, 0.95] }}
      >
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex flex-row items-center gap-2">
                <Image
                  src="/simon-icon.png"
                  alt="Simon Manzler"
                  width={24}
                  height={24}
                  loading="eager"
                />
                {!isMobile && "Portfolio"}
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
      </motion.div>
    </motion.header>
  );
}
