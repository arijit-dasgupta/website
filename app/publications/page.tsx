"use client";

import { useState } from "react";
import { getPublications } from "@/lib/contentLoader";
import PublicationCard from "@/components/cards/PublicationCard";
import PublicationModal from "@/components/modals/PublicationModal";
import type { Publication } from "@/lib/contentLoader";

export default function PublicationsPage() {
  const allPublications = getPublications();
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Publications</h1>

        {/* Publications List */}
        <div className="space-y-6">
          {allPublications.map((pub) => (
            <PublicationCard
              key={pub.slug}
              publication={pub}
              onClick={() => setSelectedPublication(pub)}
            />
          ))}
        </div>

        {selectedPublication && (
          <PublicationModal
            publication={selectedPublication}
            isOpen={!!selectedPublication}
            onClose={() => setSelectedPublication(null)}
          />
        )}
      </div>
    </div>
  );
}
