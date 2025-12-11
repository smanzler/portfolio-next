import { useState, useEffect } from "react";
import { loadIcon } from "@iconify/react";

// Import all assets that need to be preloaded
import invtImage from "@/assets/invt.png";
import repImage from "@/assets/rep.png";
import portfolioImage from "@/assets/portfolio.png";
import simonImage from "@/assets/simon.jpeg";
import simonRamenImage from "@/assets/simon-ramen.png";
import simonIconImage from "@/assets/simon-icon.png";
import { skills } from "@/components/sections/skills";

const ASSETS_TO_PRELOAD = [
  invtImage,
  repImage,
  portfolioImage,
  simonImage,
  simonRamenImage,
  simonIconImage,
];

// Extract icon names from skills array
const ICONS_TO_PRELOAD = skills.map((skill) => skill.icon);

export function usePreloadAssets() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = src;
      });
    };

    const preloadIcon = async (icon: string): Promise<void> => {
      try {
        await loadIcon(icon);
      } catch (error) {
        console.warn(`Error preloading icon ${icon}:`, error);
      }
    };

    const preloadAssets = async () => {
      const totalAssets = ASSETS_TO_PRELOAD.length + ICONS_TO_PRELOAD.length;
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        setProgress((loadedCount / totalAssets) * 100);
      };

      const imagePromises = ASSETS_TO_PRELOAD.map((asset) =>
        preloadImage(asset).then(updateProgress)
      );

      const iconPromises = ICONS_TO_PRELOAD.map((icon) =>
        preloadIcon(icon).then(updateProgress)
      );

      try {
        await Promise.all([...imagePromises, ...iconPromises]);
      } catch (error) {
        console.error("Error preloading assets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  return { isLoading, progress };
}
