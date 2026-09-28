import { DepartmentEditor } from "@/components/admin/DepartmentEditor";
import { requireAdminActor } from "@/lib/requireAdmin";

export default async function AdminDepartmentsPage() {
  const actor = await requireAdminActor();

  if (actor === null) {
    return null;
  }

  return <DepartmentEditor />;
}
