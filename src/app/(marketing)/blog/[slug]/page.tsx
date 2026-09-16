import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | NextLaunch Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [`/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-slate-200 bg-white py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Articles</span>
          </Link>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </div>

      {/* Article Container */}
      <main className="max-w-3xl mx-auto px-6 pt-10">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                {post.author.avatar}
              </div>
              <div>
                <p className="font-bold text-slate-900">{post.author.name}</p>
                <p className="text-[10px] text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <span className="text-slate-300">•</span>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{post.publishedAt}</span>
            </div>

            <span className="text-slate-300">•</span>

            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="mt-8 prose prose-slate max-w-none text-sm leading-relaxed space-y-4 text-slate-700 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-base text-slate-900 font-medium leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            {post.excerpt}
          </p>

          <div className="whitespace-pre-line font-sans text-sm leading-relaxed">
            {post.content}
          </div>

          <div className="pt-8 border-t border-slate-200 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get NextLaunch Pro ($149)</span>
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
