import Link from "next/link";
import { Flame, HeartPulse, Radio, Shield, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DepartmentRecruitmentGate, DepartmentRecruitmentPill } from "@/components/DepartmentRecruitmentStatus";
import { DEPARTMENT_ACCENT_CLASSES, getDepartments, type DepartmentCode } from "@/lib/departments";

const DEPARTMENT_ICONS: Record<DepartmentCode, typeof Shield> = {
  LEO: Shield,
  SAFD: Flame,
  SAEMS: HeartPulse,
  DISPATCH: Radio,
  CIV: ShieldCheck,
};

export default function DepartmentsPage() {
  const departments = getDepartments();

  return (
    <div className="space-y-8">
      <PageHeader title="Emergency Departments">
        Live counts of who&apos;s currently on duty:{" "}
        <Link href="/status" className="text-trooper-400 hover:underline">
          Live Status
        </Link>
        .
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-3">
        {departments.map((department) => {
          const accent = DEPARTMENT_ACCENT_CLASSES[department.accent];
          const Icon = DEPARTMENT_ICONS[department.code];
          return (
            <Card key={department.slug} className={`flex flex-col border-t-2 ${accent.border}`}>
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-bone shadow-glow-sm ${accent.iconBg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <DepartmentRecruitmentPill departmentCode={department.code} />
              </div>
              <h2 className="mt-4 text-xl text-bone">{department.name}</h2>
              <p className="mt-1 text-sm text-muted">{department.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {department.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className={accent.text}>›</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 pt-5">
                <Link href={`/departments/${department.slug}`} className="text-sm font-semibold text-bone hover:text-trooper-300">
                  Department information →
                </Link>
                {department.externalSiteUrl && (
                  <a
                    href={department.externalSiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-sm border border-line px-3 py-2 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-trooper-400"
                  >
                    Visit Fire & Rescue ↗
                  </a>
                )}
                <DepartmentRecruitmentGate
                  departmentCode={department.code}
                  fallback={
                    <div className="rounded-sm border border-line bg-ink/50 px-3 py-2 text-center text-xs font-medium uppercase tracking-wider text-muted">
                      Applications closed
                    </div>
                  }
                >
                  <Link href={`/departments/${department.slug}/apply`} className="inline-flex w-full items-center justify-center rounded-sm bg-gradient-primary px-3 py-2 text-sm font-semibold uppercase tracking-wider text-bone shadow-glow-sm transition hover:brightness-110">
                    Apply Now
                  </Link>
                </DepartmentRecruitmentGate>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
