"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { motion } from "motion/react";
import { ShimmeringText } from "./ui/shimmering-text";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

const MIN_LOADING_DURATION = 1500;
const EXIT_ANIMATION_DURATION = 600;

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash || pathname !== "/") {
      setLoading(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIsExiting(true);
      exitTimeoutRef.current = setTimeout(() => {
        setLoading(false);
      }, EXIT_ANIMATION_DURATION);
    }, MIN_LOADING_DURATION);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!loading && window.location.hash) {
      const scrollToHash = () => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView();
        }
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToHash);
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isExiting ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          transition={{ duration: isExiting ? 0.6 : 0.8, ease: "easeInOut" }}
        >
          <ShimmeringText
            text="Loading..."
            duration={1}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>
    );
  }

  return children;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <LoadingScreen>{children}</LoadingScreen>
    </NextThemesProvider>
  );
}
