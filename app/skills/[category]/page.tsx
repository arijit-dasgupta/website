import { notFound } from "next/navigation";
import { getSkillCategoryBySlug, getSkills } from "@/lib/contentLoader";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";
import { Code, Layers, Brain, Cpu, Bot, Wrench } from "lucide-react";

export async function generateStaticParams() {
  const skills = getSkills();
  return skills.map((skill) => ({
    category: skill.category.toLowerCase().replace(/\s+/g, "-"),
  }));
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  framework: Layers,
  brain: Brain,
  ml: Cpu,
  robot: Bot,
  tools: Wrench,
};

export default function SkillCategoryDetailPage({
  params,
}: {
  params: { category: string };
}) {
  const skillCategory = getSkillCategoryBySlug(params.category);

  if (!skillCategory) {
    notFound();
  }

  const IconComponent = iconMap[skillCategory.icon] || Code;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-background rounded-lg">
            <IconComponent className="h-8 w-8 text-foreground/70" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">{skillCategory.category}</h1>
            <p className="text-lg text-foreground/70 mt-2">{skillCategory.summary}</p>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {skillCategory.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border border-border flex items-center justify-center hover:border-accent transition-colors group p-3 sm:p-4 min-h-[3.5rem]"
                title={skill.name}
              >
                {skill.image ? (
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-sm sm:text-base text-foreground/60 whitespace-nowrap">
                    {skill.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
