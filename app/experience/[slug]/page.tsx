import { notFound } from "next/navigation";
import { getExperienceItemBySlug, getExperienceItems } from "@/lib/contentLoader";
import { ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";

export async function generateStaticParams() {
  const items = getExperienceItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default function ExperienceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getExperienceItemBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="flex items-start gap-4 mb-4">
          {item.logo && (
            <div className="flex-shrink-0 w-24 h-24 relative">
              <Image
                src={item.logo}
                alt={item.organization}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">{item.title}</h1>
            <p className="text-lg text-foreground/70 mb-2">{item.organization}</p>
            <p className="text-sm text-foreground/60">{item.timeframe}</p>
          </div>
        </div>

        {item.thumbnail && (
          <div className="w-full h-96 relative rounded-md overflow-hidden bg-background mb-8">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground/70 leading-relaxed">{item.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Description</h2>
          <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
            {item.description}
          </div>
        </section>

        {item.tags && item.tags.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-card text-foreground/70 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {item.links && Object.keys(item.links).length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Links</h2>
            <div className="flex flex-wrap gap-2">
              {item.links.website && (
                <a
                  href={item.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                >
                  Website <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {item.links.report && (
                <a
                  href={item.links.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                >
                  Report <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {item.links.code && (
                <a
                  href={item.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                >
                  Code <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {item.links.poster && (
                <a
                  href={item.links.poster}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Poster <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </section>
        )}

        {item.collaborators && item.collaborators.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Collaborators</h2>
            <div className="flex flex-wrap gap-2">
              {item.collaborators.map((collab, index) => (
                <a
                  key={index}
                  href={collab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  {collab.name}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
