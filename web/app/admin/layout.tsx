import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdminActor } from "@/lib/requireAdmin";
import { Card } from "@/components/ui/Card";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/accounts", label: "Accounts" },
  { href: "/admin/staff", label: "Staff" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/departments", label: "Departments" },
  { href: "/admin/department-decisions", label: "Department Decisions" },
  { href: "/admin/application-types", label: "Application Types" },
  { href: "/admin/form-builder", label: "Form Builder" },
  { href: "/admin/audit-log", label: "Audit Log" },
] as const;

// The one admin gate - see lib/requireAdmin.ts.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const actor = await requireAdminActor();

  if (actor === null) {
    return (
      <Card className="mx-auto max-w-md text-center text-sm text-muted">
        You don&apos;t have access to the admin dashboard.
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <nav className="flex flex-wrap gap-1 border-b border-line pb-4 text-sm">
        {ADMIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface-raised hover:text-bone"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
