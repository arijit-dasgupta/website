import { notFound } from "next/navigation";
import { getPublicationBySlug, getPublications } from "@/lib/contentLoader";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { ExternalLink, Copy, Check, Github, FileText, Globe, Presentation } from "lucide-react";
import CopyBibtexButton from "@/components/ui/CopyBibtexButton";
import BackButton from "@/components/ui/BackButton";

export async function generateStaticParams() {
  const publications = getPublications();
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export default function PublicationDetailPage({ params }: { params: { slug: string } }) {
  const publication = getPublicationBySlug(params.slug);

  if (!publication) {
    notFound();
  }

  const formatAuthors = () => {
    return publication.authors.map((author, index) => (
      <span key={index}>
        {author.isUser ? (
          <strong className="font-semibold">{author.name}</strong>
        ) : (
          author.name
        )}
        {author.isCoFirst && <span className="text-accent">*</span>}
        {index < publication.authors.length - 1 && ", "}
      </span>
    ));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{publication.title}</h1>
          <div className="flex items-start gap-4 mb-6">
            {publication.thumbnail && (
              <div className="flex-shrink-0 w-48 h-48 relative rounded-md overflow-hidden bg-background">
                <Image
                  src={publication.thumbnail}
                  alt={publication.title}
                  fill
                  className="object-cover"
                  unoptimized={publication.thumbnail.endsWith('.gif')}
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-foreground/70 mb-2">{formatAuthors()}</p>
              {publication.venues && publication.venues.length > 0 ? (
                <div className="mb-2">
                  {publication.venues.map((venue, index) => (
                    <p key={index} className="text-sm text-foreground/60">
                      {venue.venueShort || venue.venue} {venue.year && `(${venue.year})`}
                      {index < publication.venues.length - 1 && " • "}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-foreground/60 mb-2">{publication.venue}</p>
              )}
              {publication.venueShort !== "Under Review" && (
                <p className="text-sm text-foreground/60 mb-4">{formatDate(publication.date)}</p>
              )}

              {/* Links */}
              {publication.links && Object.keys(publication.links).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {publication.links.paper && (
                    <a
                      href={publication.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
                    >
                      Paper <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {publication.links.arxiv && (
                    <a
                      href={publication.links.arxiv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      ArXiv <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {publication.links.code && (
                    <a
                      href={publication.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {publication.links.dataset && (
                    <a
                      href={publication.links.dataset}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                    >
                      Dataset <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {publication.links.website && (
                    <a
                      href={publication.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Website <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {publication.links.poster && (
                    <a
                      href={publication.links.poster}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border hover:bg-card rounded-md transition-colors"
                    >
                      <Presentation className="h-4 w-4" />
                      Poster <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Abstract */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Abstract</h2>
          <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
            {publication.abstract}
          </p>
        </section>

        {/* Methods */}
        {publication.methods && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Methods</h2>
            <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
              {publication.methods}
            </div>
          </section>
        )}

        {/* Results */}
        {publication.results && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Results</h2>
            <div className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
              {publication.results}
            </div>
          </section>
        )}

        {/* BibTeX */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground">BibTeX</h2>
            {publication.bibtex && <CopyBibtexButton bibtex={publication.bibtex} />}
          </div>
          {publication.bibtex ? (
            <pre className="p-4 bg-card rounded-md overflow-x-auto text-sm">
              <code>{publication.bibtex}</code>
            </pre>
          ) : (
            <div className="p-4 bg-card rounded-md text-sm text-foreground/70">
              <p>BibTeX citation is not available as this paper is currently under review.</p>
            </div>
          )}
        </section>

        {/* Tags */}
        {publication.tags && publication.tags.length > 0 && (
          <section className="mb-8">
            <div className="flex flex-wrap gap-2">
              {publication.tags.map((tag, index) => (
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
      </div>
    </div>
  );
}
