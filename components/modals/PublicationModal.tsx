"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Copy, Check, Maximize2, Github, FileText, Globe, Presentation } from "lucide-react";
import BaseModal from "./BaseModal";
import type { Publication } from "@/lib/contentLoader";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface PublicationModalProps {
  publication: Publication;
  isOpen: boolean;
  onClose: () => void;
}

export default function PublicationModal({
  publication,
  isOpen,
  onClose,
}: PublicationModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"abstract" | "methods" | "results" | "bibtex">("abstract");
  const [copied, setCopied] = useState(false);

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

  const copyBibtex = async () => {
    if (!publication.bibtex) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(publication.bibtex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const tabs = [
    { id: "abstract", label: "Abstract" },
    ...(publication.methods ? [{ id: "methods", label: "Methods" }] : []),
    ...(publication.results ? [{ id: "results", label: "Results" }] : []),
    ...(publication.bibtex ? [{ id: "bibtex", label: "BibTeX" }] : []),
  ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={publication.title} size="xl">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-4">
            {publication.thumbnail && (
              <div className="flex-shrink-0 w-32 h-32 relative rounded-md overflow-hidden bg-background">
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
              <p className="text-sm text-foreground/70 mb-2">{formatAuthors()}</p>
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
                <p className="text-sm text-foreground/60">{formatDate(publication.date)}</p>
              )}
            </div>
          </div>

          {/* Links */}
          {publication.links && Object.keys(publication.links).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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

        {/* Tabs */}
        <div className="flex border-b border-border mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-accent"
                  : "border-transparent text-foreground/70 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="prose prose-sm max-w-none">
          {activeTab === "abstract" && (
            <p className="text-foreground/70 whitespace-pre-wrap">{publication.abstract}</p>
          )}
          {activeTab === "methods" && publication.methods && (
            <div className="text-foreground/70 whitespace-pre-wrap">{publication.methods}</div>
          )}
          {activeTab === "results" && publication.results && (
            <div className="text-foreground/70 whitespace-pre-wrap">{publication.results}</div>
          )}
          {activeTab === "bibtex" && publication.bibtex && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">BibTeX</h3>
                <button
                  onClick={copyBibtex}
                  className="inline-flex items-center gap-2 px-3 py-1 text-sm border border-border hover:bg-card rounded-md transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-card rounded-md overflow-x-auto text-sm">
                <code>{publication.bibtex}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-border">
          <button
            onClick={() => {
              onClose();
              router.push(`/publications/${publication.slug}`);
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
