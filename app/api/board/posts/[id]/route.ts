import { NextResponse } from "next/server";
import { SITE, currentMember, db } from "@/lib/board";

/** DELETE /api/board/posts/[id] — 내가 쓴 글만 지운다 (바로 지우지 않고 deleted_at 을 찍는다) */
export const dynamic = "force-dynamic";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const me = await currentMember();
  if (!me) return NextResponse.json({ error: "needLogin" }, { status: 401 });
  const id = Number(params.id);
  if (!Number.isSafeInteger(id) || id < 1) return NextResponse.json({ error: "notFound" }, { status: 404 });
  const { data, error } = await db().from("board_posts").update({ deleted_at: new Date().toISOString() })
    .eq("site", SITE).eq("id", id).eq("member_id", me.id).is("deleted_at", null).select("id");
  if (error) return NextResponse.json({ error: "err_server" }, { status: 500 });
  if (!data?.length) return NextResponse.json({ error: "notFound" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
