"use client";

import { usePathname } from "next/navigation";
import { InstagramFeedClient } from "./InstagramFeedClient";

export function InstagramFeedHomeOnly() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <InstagramFeedClient limit={9} title="📸 最新の投稿" />;
}
