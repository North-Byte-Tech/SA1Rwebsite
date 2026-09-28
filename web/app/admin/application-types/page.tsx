import { requireAdminActor } from "@/lib/requireAdmin";
import { DEFAULT_APPLICATION_TYPES } from "@/lib/applicationTypes";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export default async function ApplicationTypesPage() {
  const actor = await requireAdminActor();
  if (actor === null) {
    return null;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Application Types" />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DEFAULT_APPLICATION_TYPES.map((type) => (
          <Card key={type.id} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg text-bone">{type.name}</h2>
              <span className="rounded-full border border-line px-2 py-1 text-xs uppercase tracking-wide text-muted">
                {type.department}
              </span>
            </div>
            <p className="text-sm text-muted">{type.description}</p>
            <div className="text-sm text-muted">
              {type.fields.length} fields · {type.active ? "Active" : "Inactive"}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
