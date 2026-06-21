import { NextResponse } from "next/server";
import { refreshLongLivedToken } from "@/lib/instagram";

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  return Boolean(cronSecret && authHeader === `Bearer ${cronSecret}`);
}

async function handleRefresh(request: Request): Promise<NextResponse> {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await refreshLongLivedToken();
    console.log("Token refreshed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Token refresh failed:", error);
    return NextResponse.json({ error: "Token refresh failed" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handleRefresh(request);
}

export async function POST(request: Request) {
  return handleRefresh(request);
}
