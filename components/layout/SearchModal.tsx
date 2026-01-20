"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchContent } from "@/lib/search";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
  type: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchContent(query, "All");
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleResultClick = (result: SearchResult) => {
    onClose();
    const basePaths: Record<string, string> = {
      publication: "/publications",
      skill: "/skills",
      experience: "/experience",
      blog: "/blog",
      award: "/other/awards",
      volunteering: "/other/volunteering",
    };
    const basePath = basePaths[result.type] || "/";
    router.push(`${basePath}/${result.slug}`);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mt-20 w-full max-w-3xl max-h-[80vh] bg-background rounded-lg shadow-xl border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center border-b border-border p-4">
          <SearchIcon className="h-5 w-5 text-foreground/50 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search publications, projects, skills, blog posts..."
            className="flex-1 bg-transparent text-foreground placeholder:text-foreground/50 outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-card rounded-md transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5 text-foreground/70" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
          {query.trim() && results.length === 0 ? (
            <div className="p-8 text-center text-foreground/50">
              <p>No results found for "{query}"</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-2">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-4 rounded-lg hover:bg-card transition-colors border border-transparent hover:border-border"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium text-accent uppercase">
                          {result.type}
                        </span>
                        {result.category && (
                          <span className="text-xs text-foreground/50">
                            {result.category}
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-foreground mb-1">
                        {result.title}
                      </h3>
                      {result.description && (
                        <p className="text-sm text-foreground/70 line-clamp-2">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-foreground/50">
              <p>Start typing to search...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
