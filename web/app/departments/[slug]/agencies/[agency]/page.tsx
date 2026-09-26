import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { DEPARTMENT_ACCENT_CLASSES, getAgencyBySlug, getDepartmentBySlug } from "@/lib/departments";

export default function AgencyPage({ params }: { params: { slug: string; agency: string } }) {
  const department = getDepartmentBySlug(params.slug);
  if (!department) {
    notFound();
  }

  const agency = getAgencyBySlug(department, params.agency);
  if (!agency) {
    notFound();
  }

  const accent = DEPARTMENT_ACCENT_CLASSES[department.accent];

  return (
    <div className="space-y-8">
      <Link href={`/departments/${department.slug}`} className="text-sm text-muted hover:text-bone hover:underline">
        ← {department.name}
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl text-bone">{agency.name}</h1>
          <Badge tone="neutral">{agency.heading.replace(/ Agencies$/, "")}</Badge>
          <Badge tone={department.recruitmentOpen ? "success" : "neutral"}>
            {department.recruitmentOpen ? "Recruiting" : "Closed"}
          </Badge>
        </div>
        <p className="text-muted">
          One of the agencies recruited through {department.name} - {department.summary}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="text-lg text-bone">Rank Structure</h2>
          <ol className="mt-3 space-y-2 text-sm">
            {department.ranks.map((rank, index) => (
              <li key={rank} className="flex items-center gap-3 text-muted">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-bone ${accent.iconBg}`}>
                  {index + 1}
                </span>
                {rank}
              </li>
            ))}
          </ol>
        </Card>
        <Card>
          <h2 className="text-lg text-bone">Requirements to Join</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {department.requirements.map((requirement) => (
              <li key={requirement} className="flex items-start gap-2">
                <span className={accent.text}>›</span>
                {requirement}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {department.recruitmentOpen ? (
        <Link href={`/departments/${department.slug}/apply`} className={buttonClasses("primary")}>
          Apply Now
        </Link>
      ) : (
        <p className="text-sm text-muted">Recruitment is currently closed. Check back later.</p>
      )}
    </div>
  );
}
