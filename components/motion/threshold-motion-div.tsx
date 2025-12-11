import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";

interface ThresholdMotionDivProps
  extends React.ComponentProps<typeof motion.div> {
  /** Optional threshold amount (0-1) for scroll detection. Default: 0.2 */
  threshold?: number;
  /** Callback fired whenever the threshold state changes. Allows parent to track the value. */
  onThresholdChange?: (isPastThreshold: boolean) => void;
  /** Animation state when threshold is passed */
  animate?: React.ComponentProps<typeof motion.div>["animate"];
  /** Initial animation state */
  initial?: React.ComponentProps<typeof motion.div>["initial"];
  /** Transition configuration */
  transition?: React.ComponentProps<typeof motion.div>["transition"];
}

/**
 * ThresholdMotionDiv - A motion div that animates based on scroll threshold
 *
 * Automatically detects when the viewport bottom passes the element's threshold
 * and animates accordingly. Optionally exposes the threshold state to parent via callback.
 *
 * @example
 * // Basic usage
 * <ThresholdMotionDiv threshold={0.3}>
 *   Content
 * </ThresholdMotionDiv>
 *
 * @example
 * // Track threshold state in parent
 * const [isPast, setIsPast] = useState(false);
 * <ThresholdMotionDiv
 *   threshold={0.3}
 *   onThresholdChange={setIsPast}
 * >
 *   Content
 * </ThresholdMotionDiv>
 * {isPast && <div>Element is past threshold!</div>}
 */
const ThresholdMotionDiv = ({
  children,
  threshold = 0.25,
  onThresholdChange,
  animate = { opacity: 1, y: 0 },
  initial = { opacity: 0, y: 30 },
  transition = { duration: 0.2 },
  ...props
}: ThresholdMotionDivProps) => {
  // Internal ref for scroll threshold detection
  const ref = useRef<HTMLDivElement>(null);

  // Detect when viewport bottom passes the threshold
  const isPast = useScrollThreshold(ref, threshold);

  // Notify parent whenever threshold state changes
  useEffect(() => {
    if (onThresholdChange) {
      onThresholdChange(isPast);
    }
  }, [isPast, onThresholdChange]);

  return (
    <motion.div
      {...props}
      ref={ref}
      animate={isPast ? animate : initial}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default ThresholdMotionDiv;
