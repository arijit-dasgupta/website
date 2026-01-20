"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, ChevronDown, AlertCircle } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCvTooltip, setShowCvTooltip] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/publications", label: "Publications" },
    { href: "/skills", label: "Skills" },
    { href: "/experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/other") {
      return pathname === "/other" || pathname.startsWith("/other");
    }
    return pathname.startsWith(href);
  };

  const handleCvClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/pdfs/cv.pdf", { method: "HEAD" });
      if (response.ok) {
        window.open("/pdfs/cv.pdf", "_blank");
      } else {
        setShowCvTooltip(true);
        setTimeout(() => setShowCvTooltip(false), 4000);
      }
    } catch (error) {
      setShowCvTooltip(true);
      setTimeout(() => setShowCvTooltip(false), 4000);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Name/Logo */}
            <Link
              href="/"
              className="text-xl font-semibold text-foreground hover:text-accent transition-colors"
            >
              Arijit Dasgupta
            </Link>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.href)
                      ? "text-accent bg-card"
                      : "text-foreground/70 hover:text-foreground hover:bg-card"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Other Dropdown */}
              <div className="relative group">
                <button className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                  isActive("/other")
                    ? "text-accent bg-card"
                    : "text-foreground/70 hover:text-foreground hover:bg-card"
                }`}>
                  Other
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/other/awards"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-background"
                  >
                    Awards and Honors
                  </Link>
                  <Link
                    href="/other/volunteering"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-background"
                  >
                    Volunteering
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Search + CV */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground/70 hover:text-foreground hover:bg-card rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <div className="hidden sm:block relative">
                <button
                  onClick={handleCvClick}
                  className="inline-flex px-4 py-2 text-sm font-medium text-foreground bg-accent hover:bg-accent/90 rounded-md transition-colors"
                >
                  CV
                </button>
                {showCvTooltip && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-amber-50 border border-amber-200 rounded-md shadow-lg p-3 z-50 animate-fade-in">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        I'm currently working on my CV and it will be available here soon!
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-foreground/70 hover:text-foreground hover:bg-card rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(link.href)
                        ? "text-accent bg-card"
                        : "text-foreground/70 hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/other/awards"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium rounded-md text-foreground/70 hover:text-foreground hover:bg-card"
                >
                  Other - Awards
                </Link>
                <Link
                  href="/other/volunteering"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium rounded-md text-foreground/70 hover:text-foreground hover:bg-card"
                >
                  Other - Volunteering
                </Link>
                <button
                  onClick={handleCvClick}
                  className="px-3 py-2 text-sm font-medium text-foreground bg-accent hover:bg-accent/90 rounded-md text-center w-full"
                >
                  CV
                </button>
                {showCvTooltip && (
                  <div className="mt-2 w-full bg-amber-50 border border-amber-200 rounded-md shadow-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        I'm currently working on my CV and it will be available here soon!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
