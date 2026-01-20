import Image from "next/image";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import type { Publication } from "@/lib/contentLoader";

interface PublicationCardProps {
  publication: Publication;
  onClick?: () => void;
}

export default function PublicationCard({ publication, onClick }: PublicationCardProps) {
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
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-lg border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-250"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {publication.thumbnail && (
          <div className="flex-shrink-0 w-full md:w-32 h-32 relative rounded-md overflow-hidden bg-background">
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
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {publication.title}
              </h3>
              <p className="text-sm text-foreground/70 mb-2">
                {formatAuthors()}
              </p>
              <div className="flex items-center gap-3 text-sm text-foreground/60 flex-wrap">
                {publication.venues && publication.venues.length > 0 ? (
                  <>
                    {publication.venues.map((venue, index) => (
                      <span key={index}>
                        {venue.venueShort || venue.venue}
                        {index < publication.venues.length - 1 && " • "}
                      </span>
                    ))}
                    {publication.venueShort !== "Under Review" && (
                      <>
                        <span>•</span>
                        <span>{formatDateShort(publication.date)}</span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <span>{publication.venueShort}</span>
                    {publication.venueShort !== "Under Review" && (
                      <>
                        <span>•</span>
                        <span>{formatDateShort(publication.date)}</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {publication.tags && publication.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {publication.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-background text-foreground/70 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
