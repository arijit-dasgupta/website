import { getAwards, getVolunteering } from "@/lib/contentLoader";

export default function OtherPage() {
  const awards = getAwards();
  const volunteering = getVolunteering();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Other</h1>

        {/* Awards */}
        <section id="awards" className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Awards & Honors</h2>
          <div className="space-y-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-lg border border-border"
              >
                <h3 className="font-semibold text-foreground mb-1">{award.title}</h3>
                <p className="text-sm text-foreground/60 mb-1">{award.organization}</p>
                <p className="text-sm text-foreground/70">{award.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteering */}
        <section id="volunteering" className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Volunteering</h2>
          <div className="space-y-4">
            {volunteering.map((vol, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-lg border border-border"
              >
                <h3 className="font-semibold text-foreground mb-1">{vol.title}</h3>
                <p className="text-sm text-foreground/60 mb-1">{vol.organization}</p>
                <p className="text-sm text-foreground/60 mb-2">{vol.timeframe}</p>
                <p className="text-sm text-foreground/70">{vol.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
