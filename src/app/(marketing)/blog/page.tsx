import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-data';

export const metadata = {
  title: 'Engineering & Product Blog | NextLaunch Pro',
  description: 'Articles, architectural deep-dives, and guides for building and scaling SaaS applications.',
  openGraph: {
    title: 'NextLaunch Pro Engineering Blog',
    description: 'Deep dives on SaaS architecture, Polar MoR, React 19, and AI studio patterns.',
    images: ['/api/og?title=NextLaunch%20Engineering%20Blog&category=ARTICLES'],
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Blog Hero */}
      <section className="border-b border-slate-200 bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Articles & Architecture Notes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            NextLaunch Engineering Blog
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Practical breakdowns on multi-tenant SaaS engineering, billing architectures, and AI model orchestration.
          </p>
        </div>
      </section>

      {/* Post Grid */}
      <main className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-blue-600 uppercase tracking-wider text-[10px]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                    {post.author.avatar}
                  </div>
                  <span className="text-slate-700 font-medium">{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  <span>Read</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
