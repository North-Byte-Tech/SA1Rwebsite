import { NextResponse } from "next/server";
import { getStatusSnapshot } from "@/lib/status";

// Public - no session check. Reads this app's own Postgres-backed status
// snapshot directly (see lib/status.ts) - no separate portal-api hop
// anymore.
//
// Forces this route to run per-request rather than be statically optimized,
// since it reads fresh from the DB every time.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = await getStatusSnapshot();
    return NextResponse.json(snapshot);
  } catch (err) {
    console.error("[sa1r-web] /api/status GET failed:", err);
    return NextResponse.json({ data: null, updatedAt: null }, { status: 502 });
  }
}
