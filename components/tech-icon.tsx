import { Icon } from "@iconify/react";

const techIcons = {
  react: "devicon:react",
  typescript: "devicon:typescript",
  tailwindcss: "devicon:tailwindcss",
  shadcn: "devicon:shadcn",
  supabase: "devicon:supabase",
  expo: "file-icons:expo",
  reactnative: "devicon:reactnative-wordmark",
};

export default function TechIcon({ name }: { name: string }) {
  if (!techIcons[name as keyof typeof techIcons]) {
    return null;
  }

  return (
    <Icon
      icon={techIcons[name as keyof typeof techIcons]}
      className="size-4 lg:size-6"
    />
  );
}
