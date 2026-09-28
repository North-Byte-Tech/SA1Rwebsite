import { getSession } from "@/lib/session";
import { STAFF_ADMIN_PERMISSION } from "@/lib/permissions";

//export { STAFF_ADMIN_PERMISSION } from "@/lib/permissions";

export interface AdminActor {
  id: string;
  name: string | null;
}

// Session-level admin gate. This is now the ONLY check - there is no
// separate service re-deriving sa1r.staff.admin from anywhere else, so
// whatever this session says is authoritative. Every /admin page and
// /api/admin/* route calls this first and 403s/renders nothing if it comes
// back null.
export async function requireAdminActor(): Promise<AdminActor | null> {
  const session = await getSession();
  if (!session || !session.permissions.includes(STAFF_ADMIN_PERMISSION)) {
    return null;
  }
  return { id: session.userId, name: session.user?.name ?? null };
}
