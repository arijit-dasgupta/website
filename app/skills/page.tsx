"use client";

import { useState } from "react";
import { getSkills } from "@/lib/contentLoader";
import SkillCategoryCard from "@/components/cards/SkillCategoryCard";
import SkillModal from "@/components/modals/SkillModal";
import type { SkillCategory } from "@/lib/contentLoader";

export default function SkillsPage() {
  const skills = getSkills();
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Technical Skills, Frameworks & Tools</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skills.map((skill) => (
            <SkillCategoryCard
              key={skill.category}
              skillCategory={skill}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}
        </div>

        {selectedSkill && (
          <SkillModal
            skillCategory={selectedSkill}
            isOpen={!!selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </div>
    </div>
  );
}
