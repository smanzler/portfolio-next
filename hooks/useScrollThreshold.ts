import { useState } from "react";
import type { RefObject } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Custom hook that determines whether an element has scrolled into view by a certain amount.
 *
 * Uses Framer Motion's optimized useScroll with target tracking for better performance.
 * This avoids calling getBoundingClientRect on every scroll event.
 *
 * @param ref - React ref to the HTML element being observed
 * @param amount - Viewport percentage (0-1) that determines when to trigger (default: 0.3)
 *                 0 = trigger immediately when element top enters viewport bottom
 *                 0.2 = trigger when element has scrolled 20% into viewport
 *                 0.5 = trigger when element is halfway into viewport
 *                 1.0 = trigger when element top reaches viewport top
 * @returns boolean - true when element is past the threshold, false otherwise
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const isPastThreshold = useScrollThreshold(ref, 0.3); // Triggers when 30% into viewport
 */
export function useScrollThreshold(
  ref: RefObject<HTMLElement | null>,
  amount: number = 0.3
): boolean {
  // Track whether we've passed the threshold
  const [isPast, setIsPast] = useState(false);

  // Use Framer Motion's optimized scroll tracking with target element
  // offset defines when scrollYProgress goes from 0 to 1:
  // - "start end" = 0 when element start hits viewport end (bottom)
  // - "start start" = 1 when element start hits viewport start (top)
  // This means scrollYProgress represents how far the element has moved into the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Listen to scroll progress and check if we've passed the threshold
  // amount = 0.2 means trigger when element has moved 20% into viewport
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const newIsPast = progress >= amount;
    setIsPast((prev) => (prev !== newIsPast ? newIsPast : prev));
  });

  return isPast;
}
