import { requireFinalDecisionActor } from "@/lib/requireAdmin";
import { listApplications } from "@/lib/adminData";
import { PageHeader } from "@/components/ui/PageHeader";
import { DepartmentDecisionBoard } from "@/components/admin/DepartmentDecisionBoard";

export default async function DepartmentDecisionsPage() {
  const actor = await requireFinalDecisionActor();
  if (actor === null) {
    return null;
  }

  const [pendingApplications, acceptedApplications] = await Promise.all([
    listApplications("pending"),
    listApplications("accepted"),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader title="Department Decisions" />
      <p className="text-sm text-muted">
        Final approval board for opening departments and reviewing the live application queue.
      </p>
      <DepartmentDecisionBoard
        pendingApplications={pendingApplications}
        acceptedApplications={acceptedApplications}
      />
    </div>
  );
}
