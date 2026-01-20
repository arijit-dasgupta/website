"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ExperienceItem } from "@/lib/contentLoader";

interface TimelineViewProps {
  items: ExperienceItem[];
  onItemClick?: (item: ExperienceItem) => void;
}

export default function TimelineView({ items, onItemClick }: TimelineViewProps) {
  const router = useRouter();

  const handleClick = (item: ExperienceItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      router.push(`/experience/${item.slug}`);
    }
  };

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden md:block" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={item.slug}
              className={`relative flex items-start ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Date Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background z-10" />

              {/* Card */}
              <div
                onClick={() => handleClick(item)}
                className={`w-full md:w-[45%] cursor-pointer bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-250 ${
                  isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                {item.logo && (
                  <div className="mb-4 w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.logo}
                      alt={item.organization}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60 mb-2">{item.organization}</p>
                <p className="text-sm font-medium text-foreground/70 mb-3">{item.timeframe}</p>
                <p className="text-sm text-foreground/70 line-clamp-3">{item.summary}</p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs bg-background text-foreground/70 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
