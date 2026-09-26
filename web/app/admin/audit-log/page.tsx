import { requireAdminActor } from "@/lib/requireAdmin";
import { listStaffActions } from "@/lib/adminData";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default async function AdminAuditLogPage() {
  const actor = await requireAdminActor();
  if (actor === null) {
    return null;
  }

  const actions = await listStaffActions();

  return (
    <div className="space-y-8">
      <PageHeader title="Staff Action Audit Log" />
      <Card className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="pb-2 pr-4">When</th>
              <th className="pb-2 pr-4">Actor</th>
              <th className="pb-2 pr-4">Action</th>
              <th className="pb-2 pr-4">Target</th>
              <th className="pb-2">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {actions.map((action) => (
              <tr key={action.id}>
                <td className="py-2 pr-4 text-muted">{new Date(action.createdAt).toLocaleString()}</td>
                <td className="py-2 pr-4 text-bone">{action.actorName ?? "unknown"}</td>
                <td className="py-2 pr-4 text-bone">{action.action}</td>
                <td className="py-2 pr-4 text-muted">
                  {action.targetType ? `${action.targetType} ${action.targetId ?? ""}` : "—"}
                </td>
                <td className="py-2 text-muted">{action.details ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
