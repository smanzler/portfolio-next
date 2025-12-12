"use client";

import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import { ShimmeringText } from "@/components/ui/shimmering-text";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

const MIN_LOADING_DURATION = 1500;
const EXIT_ANIMATION_DURATION = 600;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (window.location.hash) {
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

  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
