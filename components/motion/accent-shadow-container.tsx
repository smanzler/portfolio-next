import { Slot } from "@radix-ui/react-slot";
import { motion, type MotionProps } from "motion/react";

const AccentShadowContainer = ({
  children,
  className,
  asChild,
  hoverOffset = 8,
  onClick,
  ...props
}: MotionProps & {
  className?: string;
  asChild?: boolean;
  hoverOffset?: number;
  onClick?: () => void;
}) => {
  const MotionSlot = motion.create(Slot);
  const Comp = asChild ? MotionSlot : motion.div;

  return (
    <Comp
      whileHover={{
        x: hoverOffset,
        y: -hoverOffset,
        boxShadow: `-${hoverOffset}px ${hoverOffset}px 0 0 var(--brand)`,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default AccentShadowContainer;
