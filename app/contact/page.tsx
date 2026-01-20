import { getProfile } from "@/lib/contentLoader";
import { Mail, Linkedin } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const profile = getProfile();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Contact</h1>

        <div className="space-y-8">
          {/* Direct Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:bg-background transition-colors"
              >
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-foreground">arijitdg [at] mit [dot] edu</span>
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:bg-background transition-colors"
              >
                <Linkedin className="h-5 w-5 text-accent" />
                <span className="text-foreground">LinkedIn</span>
              </a>
            </div>
          </section>

          {/* Availability */}
          {profile.availability && (
            <section className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-2">Availability</h2>
              <p className="text-foreground/70 mb-4">{profile.availability.seeking}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                Contact me
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
