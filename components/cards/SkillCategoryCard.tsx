import type { SkillCategory } from "@/lib/contentLoader";
import { Code, Layers, Brain, Cpu, Bot, Wrench } from "lucide-react";
import Image from "next/image";

interface SkillCategoryCardProps {
  skillCategory: SkillCategory;
  onClick?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  framework: Layers,
  brain: Brain,
  ml: Cpu,
  robot: Bot,
  tools: Wrench,
};

export default function SkillCategoryCard({ skillCategory, onClick }: SkillCategoryCardProps) {
  const IconComponent = iconMap[skillCategory.icon] || Code;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-250"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-background rounded-lg">
          <IconComponent className="h-8 w-8 text-foreground/70 group-hover:text-accent transition-colors" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {skillCategory.category}
          </h3>
          <p className="text-sm text-foreground/70">
            {skillCategory.summary}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {skillCategory.skills.map((skill, index) => (
          <div
            key={index}
            className="bg-background rounded-lg border border-border flex items-center justify-center p-2 min-h-[2.5rem]"
            title={skill.name}
          >
            {skill.image ? (
              <Image
                src={skill.image}
                alt={skill.name}
                width={32}
                height={32}
                className="object-contain"
              />
            ) : (
              <span className="text-xs text-foreground/60 whitespace-nowrap">
                {skill.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
