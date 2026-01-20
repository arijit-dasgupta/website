"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ExperienceItem } from "@/lib/contentLoader";

interface ExperienceCardProps {
  experience: ExperienceItem;
  onClick?: () => void;
}

export default function ExperienceCard({ experience, onClick }: ExperienceCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/experience/${experience.slug}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-250"
    >
      {experience.thumbnail && (
        <div className="w-full h-48 relative bg-background">
          <Image
            src={experience.thumbnail}
            alt={experience.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {experience.title}
        </h3>
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
          {experience.summary}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {experience.tags && experience.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-background text-foreground/70 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-foreground/50">
            {experience.timeframe}
          </span>
        </div>
      </div>
    </div>
  );
}
