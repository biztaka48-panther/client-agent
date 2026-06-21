import type { InstagramFeedResponse, InstagramPost } from "@/types/instagram";

const INSTAGRAM_API_BASE = "https://graph.instagram.com";

export async function getInstagramFeed(limit: number = 12): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    throw new Error("Instagram credentials are not configured");
  }

  const fields = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
  const url = `${INSTAGRAM_API_BASE}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

  const response = await fetch(url, {
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.status}`);
  }

  const data = (await response.json()) as InstagramFeedResponse;

  return (data.data ?? []).filter(
    (post) => post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM",
  );
}

export async function refreshLongLivedToken(): Promise<string> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("INSTAGRAM_ACCESS_TOKEN is not configured");
  }

  const url = `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Instagram token refresh error: ${response.status}`);
  }

  const data = (await response.json()) as { access_token?: string };

  if (!data.access_token) {
    throw new Error("Instagram token refresh response missing access_token");
  }

  return data.access_token;
}
