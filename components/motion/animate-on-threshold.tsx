"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";

interface AnimateOnThresholdProps
  extends Omit<React.ComponentProps<typeof motion.div>, "animate" | "initial"> {
  /** Whether the threshold has been passed - controls animation */
  shouldAnimate: boolean;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Custom animation variants */
  variants?: Variants;
  /** Custom initial state (object with animation properties) */
  initial?: React.ComponentProps<typeof motion.div>["initial"];
  /** Custom animate state (object with animation properties) */
  animate?: React.ComponentProps<typeof motion.div>["animate"];
  /** Transition configuration */
  transition?: React.ComponentProps<typeof motion.div>["transition"];
}

/**
 * AnimateOnThreshold - Simple animation component that animates based on a boolean flag
 *
 * This component is designed to work with useScrollThreshold - when the threshold
 * is passed, it animates children with a configurable delay. Perfect for sequential
 * animations within a container.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const isPast = useScrollThreshold(ref, 0.2);
 *
 * <div ref={ref}>
 *   <AnimateOnThreshold shouldAnimate={isPast} delay={0}>
 *     First item
 *   </AnimateOnThreshold>
 *   <AnimateOnThreshold shouldAnimate={isPast} delay={0.1}>
 *     Second item
 *   </AnimateOnThreshold>
 * </div>
 */
export const AnimateOnThreshold = ({
  children,
  shouldAnimate,
  delay = 0,
  variants,
  initial: customInitial,
  animate: customAnimate,
  transition = { duration: 0.4 },
  ...props
}: AnimateOnThresholdProps) => {
  // If custom variants provided, use them; otherwise create from initial/animate props
  // Add transition variants: entrance uses delay, exit uses 0 delay
  const defaultInitial =
    typeof customInitial === "object" && customInitial !== null
      ? customInitial
      : { opacity: 0, y: 30 };
  const defaultAnimate =
    typeof customAnimate === "object" && customAnimate !== null
      ? customAnimate
      : { opacity: 1, y: 0 };

  const finalVariants: Variants = variants
    ? variants
    : ({
        hidden: {
          ...defaultInitial,
          transition: { ...transition, delay: 0 },
        },
        visible: {
          ...defaultAnimate,
          transition: { ...transition, delay },
        },
      } as Variants);

  return (
    <motion.div
      {...props}
      variants={finalVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};
