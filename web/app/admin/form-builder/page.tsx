import { requireAdminActor } from "@/lib/requireAdmin";
import { PageHeader } from "@/components/ui/PageHeader";
import { FormBuilderEditor } from "@/components/admin/FormBuilderEditor";

export default async function FormBuilderPage() {
  const actor = await requireAdminActor();
  if (actor === null) {
    return null;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Form Builder" />
      <FormBuilderEditor />
    </div>
  );
}
