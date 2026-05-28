/**
 * 블로그 조회수 증가 API
 *
 * 클라이언트(BlogViewTracker)에서 POST 호출 → blog_posts.view_count += 1
 * SECURITY DEFINER RPC 함수 (increment_blog_view)로 anon 권한에서도 안전하게 UPDATE.
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SITE_KEY = "witheass" as const;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json({ skipped: true });
  }

  try {
    const { slug } = await req.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.rpc("increment_blog_view", {
      p_site: SITE_KEY,
      p_slug: slug,
    });

    if (error) {
      console.error("[/api/blog/track-view] rpc error:", error);
      return NextResponse.json({ error: "rpc_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
