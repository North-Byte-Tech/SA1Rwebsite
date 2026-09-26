import { NextResponse } from "next/server";
import { requireAdminActor } from "@/lib/requireAdmin";
import { listPermissionCatalog } from "@/lib/adminData";

export async function GET() {
  const actor = await requireAdminActor();
  if (actor === null) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json(listPermissionCatalog());
}
