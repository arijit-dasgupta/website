import { getVolunteering } from "@/lib/contentLoader";
import Image from "next/image";

export default function VolunteeringPage() {
  const volunteering = getVolunteering();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Volunteering</h1>

        <div className="space-y-4">
          {volunteering.map((vol, index) => (
            <div
              key={index}
              className="p-4 bg-card rounded-lg border border-border"
            >
              <div className="flex items-start gap-4">
                {vol.logo && (
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image
                      src={vol.logo}
                      alt={vol.organization}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{vol.title}</h3>
                  <p className="text-sm text-foreground/60 mb-1">{vol.organization}</p>
                  <p className="text-sm text-foreground/60 mb-2">{vol.timeframe}</p>
                  <p className="text-sm text-foreground/70">{vol.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
