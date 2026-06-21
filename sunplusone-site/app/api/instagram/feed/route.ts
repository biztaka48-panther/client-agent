import { NextResponse } from "next/server";
import { getInstagramFeed } from "@/lib/instagram";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const posts = await getInstagramFeed(Number.isFinite(limit) ? limit : 12);

    return NextResponse.json(
      { posts },
      {
        headers: {
          ...corsHeaders,
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
        },
      },
    );
  } catch (error) {
    console.error("Instagram feed error:", error);
    return NextResponse.json(
      { error: "Instagram フィードの取得に失敗しました" },
      { status: 500, headers: corsHeaders },
    );
  }
}
