import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "./ui/button";
import React from "react";

export function ResponsiveButton({
  icon,
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof Button> & { icon: React.ReactNode }) {
  const isMobile = useIsMobile();
  const buttonSize = isMobile ? "icon" : props.size;

  // Handle asChild case (for links, etc.)
  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as Record<string, unknown> & {
      children?: React.ReactNode;
    };
    const originalContent = childProps.children;

    const responsiveContent = isMobile ? (
      icon
    ) : (
      <>
        {icon}
        {originalContent}
      </>
    );

    const clonedChild = React.cloneElement(
      children,
      childProps,
      responsiveContent
    );

    return (
      <Button {...props} asChild size={buttonSize}>
        {clonedChild}
      </Button>
    );
  }

  // Regular button case
  const buttonContent = isMobile ? (
    icon
  ) : (
    <>
      {icon}
      {children}
    </>
  );

  return (
    <Button {...props} size={buttonSize}>
      {buttonContent}
    </Button>
  );
}
