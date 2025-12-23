"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Button, buttonVariants } from "./ui/button";
import { type VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

type ResponsiveContent =
  | React.ReactNode
  | ((props: { isMobile: boolean }) => React.ReactNode);

type ResponsiveConfig<T> = { mobile?: T; desktop?: T } | T;

type ResponsiveButtonProps<T extends React.ElementType = typeof Button> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "children" | "variant" | "size" | "asChild"
> & {
  children?: ResponsiveContent;
  icon?: ResponsiveContent;
  iconSide?: "left" | "right";
  iconOnlyOnMobile?: boolean;
  variant?: ResponsiveConfig<ButtonVariant>;
  size?: ResponsiveConfig<ButtonSize>;
  as?: T;
  asChild?: boolean;
  className?: string;
};

function resolveContent(
  content: ResponsiveContent | undefined,
  isMobile: boolean
): React.ReactNode {
  if (!content) return null;
  return typeof content === "function" ? content({ isMobile }) : content;
}

function resolveConfig<T>(
  config: ResponsiveConfig<T> | undefined,
  isMobile: boolean
): T | undefined {
  if (!config) return undefined;
  if (typeof config === "object" && config !== null && "mobile" in config) {
    return isMobile ? config.mobile : config.desktop;
  }
  return config as T;
}

function buildContent(
  baseContent: React.ReactNode,
  iconContent: React.ReactNode,
  iconSide: "left" | "right",
  isMobile: boolean,
  iconOnlyOnMobile: boolean
): React.ReactNode {
  if (isMobile && iconOnlyOnMobile && iconContent) {
    return iconContent;
  }
  if (iconContent) {
    return (
      <>
        {iconSide === "left" && iconContent}
        {baseContent}
        {iconSide === "right" && iconContent}
      </>
    );
  }
  return baseContent;
}

export function ResponsiveButton<T extends React.ElementType = typeof Button>({
  children,
  icon,
  iconSide = "left",
  iconOnlyOnMobile = true,
  variant,
  size,
  as: Parent = Button as T,
  asChild = false,
  className,
  ...props
}: ResponsiveButtonProps<T>) {
  const isMobile = useIsMobile();
  const resolvedVariant = resolveConfig(variant, isMobile);
  const resolvedSize =
    resolveConfig(size, isMobile) ??
    (isMobile && iconOnlyOnMobile && icon ? "icon" : undefined);

  // Build content
  let baseContent: React.ReactNode;
  if (asChild && React.isValidElement(children)) {
    const childProps = (children as React.ReactElement).props as {
      children?: React.ReactNode;
    };
    baseContent =
      typeof children === "function"
        ? resolveContent(children, isMobile)
        : resolveContent(childProps.children, isMobile);
  } else {
    baseContent = resolveContent(children, isMobile);
  }

  const iconContent = resolveContent(icon, isMobile);
  const finalContent = buildContent(
    baseContent,
    iconContent,
    iconSide,
    isMobile,
    iconOnlyOnMobile
  );

  // Build parent props
  const parentProps = {
    ...props,
    className,
    ...(Parent === Button && resolvedVariant && { variant: resolvedVariant }),
    ...(Parent === Button && resolvedSize && { size: resolvedSize }),
  };

  // Handle asChild pattern
  if (asChild) {
    if (!React.isValidElement(children)) return null;

    const childElement = children as React.ReactElement;
    const childProps = childElement.props as Record<string, unknown>;
    const clonedChild = React.cloneElement(childElement, {
      ...childProps,
      children: finalContent,
    } as any);

    if (Parent === Button) {
      return (
        <Slot
          {...(parentProps as any)}
          className={cn(
            buttonVariants({ variant: resolvedVariant, size: resolvedSize }),
            className
          )}
        >
          {clonedChild}
        </Slot>
      );
    }

    const ParentComponent = Parent as React.ComponentType<any>;
    return (
      <ParentComponent {...(parentProps as any)}>{clonedChild}</ParentComponent>
    );
  }

  // Regular rendering
  if (Parent === Button) {
    return (
      <Button
        {...(parentProps as React.ComponentProps<typeof Button>)}
        className={cn(
          buttonVariants({ variant: resolvedVariant, size: resolvedSize }),
          className
        )}
      >
        {finalContent}
      </Button>
    );
  }

  const ParentComponent = Parent as React.ComponentType<any>;
  return (
    <ParentComponent {...(parentProps as any)}>{finalContent}</ParentComponent>
  );
}
