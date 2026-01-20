import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-foreground/70 mb-8">
          Hi! Arijit here. If you are seeing this page, then I must have left a bug in my website code. If you have the time, would you kindly let me know? Thank you!
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
