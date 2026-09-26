import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

// Replaces portal-api's in-memory statusStore.ts with a persistent
// single-row table, so a restart of this app doesn't blank the live status
// board. The FiveM server (or anything else holding STATUS_REPORT_SECRET)
// pushes here directly now instead of to portal-api - see
// app/api/status/report/route.ts.
export interface StatusSnapshot {
  data: unknown;
  updatedAt: string | null;
}

export async function getStatusSnapshot(): Promise<StatusSnapshot> {
  const row = await prisma.statusSnapshot.findUnique({ where: { id: 1 } });
  if (!row) {
    return { data: null, updatedAt: null };
  }
  return { data: row.data, updatedAt: row.updatedAt.toISOString() };
}

export async function reportStatus(data: unknown): Promise<void> {
  await prisma.statusSnapshot.upsert({
    where: { id: 1 },
    create: { id: 1, data: data as Prisma.InputJsonValue },
    update: { data: data as Prisma.InputJsonValue },
  });
}
