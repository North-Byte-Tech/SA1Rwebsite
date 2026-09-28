import Link from "next/link";
import { getSession } from "@/lib/session";
import { listMyApplications, type ApplicationStatus } from "@/lib/applications";
import { DEPARTMENTS } from "@/lib/departments";
import { AuthButton } from "@/components/AuthButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending review",
  accepted: "Accepted",
  rejected: "Rejected",
};

const STATUS_TONES: Record<ApplicationStatus, BadgeTone> = {
  pending: "warning",
  accepted: "success",
  rejected: "danger",
};

export default async function PortalPage() {
  const session = await getSession();

  if (!session || !session.discordId) {
    return (
      <div className="mx-auto max-w-xl space-y-8">
        <PageHeader title="My Portal" />
        <Card className="space-y-4 text-center">
          <p className="text-sm text-muted">Sign in with Discord to see your account.</p>
          <div className="flex justify-center">
            <AuthButton signedIn={Boolean(session)} />
          </div>
        </Card>
      </div>
    );
  }

  const applications = await listMyApplications(session.discordId);
  const departmentPortals: { id: string; name: string; slug: string }[] = [];

  for (const application of applications) {
    if (application.status !== "accepted") {
      continue;
    }

    const department = DEPARTMENTS.find((entry) => entry.code === application.department);
    if (!department) {
      continue;
    }

    const existingPortal = departmentPortals.find((portal) => portal.slug === department.slug);
    if (!existingPortal) {
      departmentPortals.push({ id: application.id, name: department.name, slug: department.slug });
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader title="My Portal" />

      <Card>
        <h2 className="text-lg text-bone">Account</h2>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted">Discord</dt>
          <dd className="text-bone">{session.user?.name ?? "unknown"}</dd>
        </dl>
      </Card>

      <Card>
        <h2 className="text-lg text-bone">Department Portals</h2>
        {departmentPortals.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            Once your application is accepted, your department portal links will appear here.
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {departmentPortals.map((portal) => (
              <Link
                key={portal.id}
                href={`/portal/${portal.slug}`}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-bone transition hover:border-trooper-400 hover:text-trooper-300"
              >
                {portal.name} Portal
              </Link>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <h2 className="text-lg text-bone">My Applications</h2>
        {applications.length === 0 ? (
          <p className="mt-2 text-sm text-muted">You haven&apos;t submitted any department applications.</p>
        ) : (
          <ul className="mt-3 divide-y divide-line">
            {applications.map((application) => (
              <li key={application.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-bone">
                  {application.department} — submitted {new Date(application.createdAt).toLocaleDateString()}
                </span>
                <Badge tone={STATUS_TONES[application.status]}>{STATUS_LABELS[application.status]}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
