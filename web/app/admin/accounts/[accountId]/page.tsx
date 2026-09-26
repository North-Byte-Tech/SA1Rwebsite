import { notFound } from "next/navigation";
import { requireAdminActor } from "@/lib/requireAdmin";
import { getAccount, listAccountPermissions, listPermissionCatalog, listPlayerNotes } from "@/lib/adminData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BanControls } from "@/components/admin/BanControls";
import { PlayerNotes } from "@/components/admin/PlayerNotes";
import { PermissionsEditor } from "@/components/admin/PermissionsEditor";

export default async function AdminAccountDetailPage({ params }: { params: { accountId: string } }) {
  const actor = await requireAdminActor();
  if (actor === null) {
    return null;
  }

  const account = await getAccount(params.accountId);
  if (!account) {
    notFound();
  }

  const [notes, catalog, granted] = await Promise.all([
    listPlayerNotes(account.accountId),
    listPermissionCatalog(),
    listAccountPermissions(account.accountId),
  ]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl text-bone">{account.discordName ?? "unknown"}</h1>
        <span className="text-muted">#{account.accountId}</span>
        {account.isBanned && <Badge tone="danger">Banned</Badge>}
      </header>

      <Card>
        <h2 className="text-lg text-bone">Ban</h2>
        <BanControls accountId={account.accountId} isBanned={account.isBanned} />
      </Card>

      <Card>
        <h2 className="text-lg text-bone">Player Notes</h2>
        <PlayerNotes accountId={account.accountId} notes={notes} />
      </Card>

      <Card>
        <h2 className="text-lg text-bone">Permissions</h2>
        <PermissionsEditor accountId={account.accountId} catalog={catalog} granted={granted} />
      </Card>
    </div>
  );
}
