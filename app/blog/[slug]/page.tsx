import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/contentLoader";
import { formatDate } from "@/lib/utils";
import BackButton from "@/components/ui/BackButton";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
        <p className="text-sm text-foreground/60 mb-8">{formatDate(post.date)}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-card text-foreground/70 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
}
