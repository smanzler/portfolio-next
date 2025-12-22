"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "./ui/button";
import React from "react";

type ParentComponentProps = {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
  [key: string]: unknown;
};

export function ResponsiveButton({
  icon,
  parent: Parent = Button,
  children,
  asChild,
  className,
  size,
  ...props
}: React.ComponentProps<typeof Button> & {
  icon: React.ReactNode;
  parent?: React.ComponentType<ParentComponentProps>;
}) {
  const isMobile = useIsMobile();
  const buttonSize = isMobile ? "icon" : size;

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

    // Only pass size if Parent is Button (has size prop)
    const parentProps =
      Parent === Button
        ? { ...props, asChild, size: buttonSize, className }
        : { ...props, asChild, className };

    return <Parent {...parentProps}>{clonedChild}</Parent>;
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

  // Only pass size if Parent is Button (has size prop)
  const parentProps =
    Parent === Button
      ? { ...props, size: buttonSize, className }
      : { ...props, className };

  return <Parent {...parentProps}>{buttonContent}</Parent>;
}
