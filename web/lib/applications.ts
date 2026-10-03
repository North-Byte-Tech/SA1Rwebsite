import type { ApplicationStatus, Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import type { DepartmentCode } from "./departments";
import { emitRecruitmentBotEvent } from "./discordBot";

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

  await emitRecruitmentBotEvent("application_submitted", {
    discordId: input.discordId,
    discordUsername: input.discordUsername,
    department: input.department,
    message: "Your application has been submitted and a staff member will review it.",
  });
}
