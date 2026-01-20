"use client";

import { useRouter } from "next/navigation";
import { Maximize2 } from "lucide-react";
import BaseModal from "./BaseModal";
import type { SkillCategory } from "@/lib/contentLoader";
import Image from "next/image";

interface SkillModalProps {
  skillCategory: SkillCategory;
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillModal({ skillCategory, isOpen, onClose }: SkillModalProps) {
  const router = useRouter();
  const categorySlug = skillCategory.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={skillCategory.category} size="md">
      <div className="p-6">
        <p className="text-foreground/70 mb-6">{skillCategory.summary}</p>

        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {skillCategory.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border border-border flex items-center justify-center group hover:border-accent transition-colors p-3 min-h-[3rem]"
                title={skill.name}
              >
                {skill.image ? (
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-sm text-foreground/60 whitespace-nowrap">
                    {skill.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
          <button
            onClick={() => {
              onClose();
              router.push(`/skills/${categorySlug}`);
            }}
            className="p-2 border border-border hover:bg-card rounded-md transition-colors"
            aria-label="Expand to full page"
          >
            <Maximize2 className="h-5 w-5 text-foreground/70" />
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
