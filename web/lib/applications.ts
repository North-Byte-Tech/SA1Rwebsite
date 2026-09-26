import type { ApplicationStatus, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import type { DepartmentCode } from "./departments";

export type { ApplicationStatus };

export interface DepartmentApplicationInput {
  discordId: string;
  discordUsername: string;
  department: DepartmentCode;
  answers: Record<string, string>;
}

// Not tied to a User row by foreign key - a submission always succeeds even
// for an applicant who has never signed in before (matches the old
// portal-api behaviour), keyed purely by their Discord id/username.
export async function submitDepartmentApplication(input: DepartmentApplicationInput): Promise<void> {
  await prisma.application.create({
    data: {
      discordId: input.discordId,
      discordUsername: input.discordUsername,
      department: input.department,
      answers: input.answers as Prisma.InputJsonValue,
    },
  });
}

export interface ApplicationSummary {
  id: string;
  department: DepartmentCode;
  status: ApplicationStatus;
  createdAt: string;
  reviewedAt: string | null;
}

// Fetched fresh on every /portal page load (not read off the session) so a
// newly reviewed application shows up without forcing a re-login.
export async function listMyApplications(discordId: string): Promise<ApplicationSummary[]> {
  const rows = await prisma.application.findMany({
    where: { discordId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((row) => ({
    id: row.id,
    department: row.department as DepartmentCode,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
    reviewedAt: row.reviewedAt?.toISOString() ?? null,
  }));
}
