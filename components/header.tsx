"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Brain, Briefcase, FolderOpenDot, Mail, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { motion, useScroll } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const lastVisibilityChangeY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleClick = (id: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    if (pathname === "/") {
      scrollToSection(id);
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-1/2 -translate-x-1/2 z-5 flex flex-col justify-center items-center w-full max-w-3xl px-6"
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
            : "bg-transparent"
        )}
        animate={{
          padding: isScrolled ? "4px 24px" : "4px 0px",
        }}
        transition={{ duration: 0.3, ease: [0.1, 0.6, 0.3, 0.95] }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => handleClick("home", e)}
            >
              <Image
                src="/simon-icon.png"
                alt="Simon Manzler"
                width={24}
                height={24}
                loading="eager"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Simon Manzler</TooltipContent>
        </Tooltip>

        <nav className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-brand"
                onClick={(e) => handleClick("projects", e)}
              >
                <FolderOpenDot />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Projects</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-brand"
                onClick={(e) => handleClick("skills", e)}
              >
                <Brain />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Skills</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-brand"
                onClick={(e) => handleClick("about", e)}
              >
                <User />
              </Button>
            </TooltipTrigger>
            <TooltipContent>About</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-brand"
                onClick={(e) => handleClick("experience", e)}
              >
                <Briefcase />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Experience</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-brand"
                onClick={(e) => handleClick("contact", e)}
              >
                <Mail />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Contact</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle className="hover:text-brand" />
            </TooltipTrigger>
            <TooltipContent>Toggle Theme</TooltipContent>
          </Tooltip>
        </nav>
      </motion.div>
    </motion.header>
  );
}
