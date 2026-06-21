"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { InstagramPost } from "@/types/instagram";

interface Props {
  limit?: number;
  title?: string;
}

export function InstagramFeedClient({ limit = 9, title = "Instagram" }: Props) {
  const [posts, setPosts] = useState<InstagramPost[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/instagram/feed?limit=${limit}`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: { posts?: InstagramPost[] }) => {
        if (cancelled) return;
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          setPosts([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  if (posts === null) {
    return (
      <section className="border-t border-line bg-card px-4 py-12 md:py-16" aria-busy="true">
        <div className="mx-auto max-w-6xl text-center text-sm text-ink-muted">読み込み中…</div>
      </section>
    );
  }

  if (failed || posts.length === 0) {
    return null;
  }

  const username = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME;

  return (
    <section className="border-t border-line bg-card px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl font-bold text-brand md:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-ink-muted md:text-base">最新の投稿をご覧ください</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl border border-line bg-surface shadow-sm ring-1 ring-gold/15"
            >
              <Image
                src={post.media_url}
                alt={post.caption?.slice(0, 120) || "Instagram 投稿"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </a>
          ))}
        </div>
        {username ? (
          <div className="mt-8 text-center md:mt-10">
            <a
              href={`https://www.instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Instagram をフォロー
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
