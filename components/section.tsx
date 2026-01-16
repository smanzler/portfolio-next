import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  contentClassName?: string;
}

export default function Section({
  children,
  id,
  className,
  contentClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("min-h-screen p-4 sm:p-20", className)}>
      <div
        className={cn(
          "max-w-7xl mx-auto flex flex-col gap-6",
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
