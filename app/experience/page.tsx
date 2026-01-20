"use client";

import { useState } from "react";
import { getExperienceItemsByType } from "@/lib/contentLoader";
import TimelineView from "@/components/timeline/TimelineView";
import ExperienceCard from "@/components/cards/ExperienceCard";
import type { ExperienceItem } from "@/lib/contentLoader";

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<"program" | "research" | "engineering">("program");

  const programItems = getExperienceItemsByType("program");
  const researchItems = getExperienceItemsByType("research");
  const internshipItems = getExperienceItemsByType("internship");
  const engineeringItems = getExperienceItemsByType("engineering");

  const getDisplayItems = () => {
    if (activeTab === "program") {
      return programItems;
    }
    if (activeTab === "research") {
      // Combine and re-sort by date (newest first)
      const combined = [...researchItems, ...internshipItems];
      return combined.sort((a, b) => {
        // For ongoing items (dateEnd is null), treat as most recent
        if (a.dateEnd === null && b.dateEnd === null) {
          return new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime();
        }
        // If only one is ongoing, it should be first
        if (a.dateEnd === null) return -1;
        if (b.dateEnd === null) return 1;
        
        // Both have end dates, compare them
        const aDate = a.dateEnd || a.dateStart;
        const bDate = b.dateEnd || b.dateStart;
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      });
    }
    return engineeringItems;
  };

  const displayItems = getDisplayItems();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Experience</h1>

        {/* Tabs */}
        <div className="flex border-b border-border mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("program")}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "program"
                ? "border-accent text-accent"
                : "border-transparent text-foreground/70 hover:text-foreground"
            }`}
          >
            Industry, Government & Academia Programs
          </button>
          <button
            onClick={() => setActiveTab("research")}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "research"
                ? "border-accent text-accent"
                : "border-transparent text-foreground/70 hover:text-foreground"
            }`}
          >
            Research & Internships
          </button>
          <button
            onClick={() => setActiveTab("engineering")}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "engineering"
                ? "border-accent text-accent"
                : "border-transparent text-foreground/70 hover:text-foreground"
            }`}
          >
            Engineering Projects
          </button>
        </div>

        {/* Content */}
        {activeTab === "engineering" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item) => (
              <ExperienceCard key={item.slug} experience={item} />
            ))}
          </div>
        ) : (
          <TimelineView items={displayItems} />
        )}
      </div>
    </div>
  );
}
