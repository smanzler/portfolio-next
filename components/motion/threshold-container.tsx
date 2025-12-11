import { useRef } from "react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import type { ReactNode } from "react";

interface ThresholdContainerProps {
  /** Children to render */
  children: (isPastThreshold: boolean) => ReactNode;
  /** Optional threshold amount (0-1) for scroll detection. Default: 0.3 */
  threshold?: number;
  /** Optional className for the container */
  className?: string;
}

/**
 * ThresholdContainer - Container that detects scroll threshold and provides state to children
 *
 * This component uses useScrollThreshold on itself and passes the boolean state
 * to children via a render prop. Perfect for animating multiple children based on
 * a single threshold detection.
 *
 * @example
 * <ThresholdContainer threshold={0.3}>
 *   {(isPast) => (
 *     <>
 *       <AnimateOnThreshold shouldAnimate={isPast} delay={0}>
 *         First item
 *       </AnimateOnThreshold>
 *       <AnimateOnThreshold shouldAnimate={isPast} delay={0.1}>
 *         Second item
 *       </AnimateOnThreshold>
 *     </>
 *   )}
 * </ThresholdContainer>
 */
export const ThresholdContainer = ({
  children,
  threshold = 0.25,
  className,
}: ThresholdContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isPastThreshold = useScrollThreshold(ref, threshold);

  return (
    <div ref={ref} className={className}>
      {children(isPastThreshold)}
    </div>
  );
};
