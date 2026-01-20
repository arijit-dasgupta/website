import Link from "next/link";
import { Mail, Linkedin, Github, GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:arijitdg@mit.edu"
                className="flex items-center space-x-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>arijitdg [at] mit [dot] edu</span>
              </a>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://scholar.google.com/citations?user=ijB9uzMAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Google Scholar"
                >
                  <GraduationCap className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/arijit-dasgupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/arijitdasgupta97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/publications"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Publications
              </Link>
              <Link
                href="/experience"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Experience
              </Link>
              <Link
                href="/skills"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Skills
              </Link>
              <Link
                href="/other"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Other
              </Link>
              <Link
                href="/contact"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} Arijit Dasgupta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
