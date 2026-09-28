import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { listMyApplications } from "@/lib/applications";
import { getDepartmentBySlug } from "@/lib/departments";
import { AuthButton } from "@/components/AuthButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default async function DepartmentPortalPage({ params }: { params: { slug: string } }) {
  const session = await getSession();

  if (!session || !session.discordId) {
    return (
      <div className="mx-auto max-w-xl space-y-8">
        <PageHeader title="Department Portal" />
        <Card className="space-y-4 text-center">
          <p className="text-sm text-muted">Sign in with Discord to access your department portal.</p>
          <div className="flex justify-center">
            <AuthButton signedIn={Boolean(session)} />
          </div>
        </Card>
      </div>
    );
  }

  const department = getDepartmentBySlug(params.slug);
  if (!department) {
    notFound();
  }

  const applications = await listMyApplications(session.discordId);
  const isAcceptedMember = applications.some(
    (application) => application.department === department.code && application.status === "accepted",
  );

  if (!isAcceptedMember) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader title={`${department.name} Portal`}>
        <Link href="/portal" className="text-sm text-trooper-400 hover:underline">
          ← Back to My Portal
        </Link>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg text-bone">Quick Access</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Department: {department.name}</li>
            <li>Status: Accepted</li>
            <li>Shift availability: Check in with department command</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg text-bone">Department Roster</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {department.portal.roster.map((member) => (
              <li key={`${member.name}-${member.title}`} className="flex justify-between gap-2">
                <span>{member.name}</span>
                <span className="text-bone">{member.title}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg text-bone">EUP & Equipment</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {department.portal.equipment.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-trooper-400">›</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg text-bone">Callsigns</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {department.portal.callsigns.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-trooper-400">›</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg text-bone">Rules & Expectations</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {department.portal.rules.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-trooper-400">›</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link href={`/departments/${department.slug}`} className="rounded-full bg-trooper-500 px-4 py-2 text-sm font-medium text-bone hover:bg-trooper-400">
          Department Details
        </Link>
        <Link href="/portal" className="rounded-full border border-line px-4 py-2 text-sm font-medium text-bone hover:border-trooper-400">
          My Portal
        </Link>
      </div>
    </div>
  );
}
