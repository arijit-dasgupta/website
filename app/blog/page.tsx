import { getBlogPosts } from "@/lib/contentLoader";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Blog</h1>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-250"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-2">{post.title}</h2>
              <p className="text-sm text-foreground/60 mb-4">{formatDate(post.date)}</p>
              <p className="text-foreground/70">{post.excerpt}</p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-background text-foreground/70 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
