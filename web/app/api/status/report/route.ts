import { NextResponse } from "next/server";
import { reportStatus } from "@/lib/status";

// Replaces portal-api's POST /status/report. The FiveM server's status-push
// script (sfos-core) should point here now, sending the same
// x-sa1r-portal-secret-style header - set STATUS_REPORT_SECRET and
// reconfigure that script's URL + secret when retiring portal-api.
export async function POST(request: Request) {
  const secret = process.env.STATUS_REPORT_SECRET;
  if (!secret || request.headers.get("x-sa1r-status-secret") !== secret) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  try {
    await reportStatus(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sa1r-web] /api/status/report failed:", err);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
