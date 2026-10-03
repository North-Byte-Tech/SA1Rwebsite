import Link from "next/link";
import { requireAdminActor } from "@/lib/requireAdmin";
import { listApplications, listBans, listStaff } from "@/lib/adminData";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default async function AdminOverviewPage() {
  const actor = await requireAdminActor();
  if (actor === null) {
    // Unreachable in practice - app/admin/layout.tsx already gates this
    // whole route segment before this page's body ever runs.
    return null;
  }

  const [pending, bans, staff] = await Promise.all([
    listApplications("pending"),
    listBans(),
    listStaff(),
  ]);
  const stats = [
    { label: "Pending applications", value: pending.length, href: "/admin/applications" },
    { label: "Active bans", value: bans.length, href: "/admin/accounts" },
    { label: "Staff members", value: staff.length, href: "/admin/staff" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="Admin Dashboard" />

      <Card padded={false} className="border border-trooper-500/40 bg-gradient-to-r from-trooper-600/20 to-surface p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-steel">Operations</p>
            <h2 className="mt-1 text-2xl text-bone">Staff control center</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/applications"
              className="inline-flex items-center justify-center rounded-full border border-trooper-500/50 bg-trooper-500/15 px-4 py-2 text-sm font-semibold text-bone transition hover:border-trooper-400 hover:bg-trooper-500/25"
            >
              Review applications
            </Link>
            <Link
              href="/admin/department-decisions"
              className="inline-flex items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-bone transition hover:border-gold-400 hover:bg-gold-500/20"
            >
              Final department decisions
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="text-center transition-colors hover:border-trooper-600/60">
              <p className="text-3xl text-bone">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
