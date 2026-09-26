// Shared with lib/auth.ts (which needs it for the admin bootstrap below) and
// lib/requireAdmin.ts - pulled out on its own so auth.ts doesn't have to
// import from requireAdmin.ts (which itself imports authOptions from
// lib/auth.ts) and create a circular import.
export const STAFF_ADMIN_PERMISSION = "sa1r.staff.admin";

// The fixed set of grantable permissions shown in the admin Permissions
// editor - mirrors discord-bot/src/commands.ts's PERMISSION_CHOICES (kept as
// a fixed list there too, for the same reason: avoid typo'd permission
// strings). The two lists are independent now that portal-api no longer
// bridges them, so keep them in sync by hand if this ever changes.
export interface PermissionCatalogEntry {
  permission: string;
  label: string;
}

export const PERMISSION_CATALOG: PermissionCatalogEntry[] = [
  { permission: "sa1r.role.police", label: "LEO" },
  { permission: "sa1r.role.fire", label: "Fire & Rescue (SAFD)" },
  { permission: "sa1r.role.stjohn", label: "EMS" },
  { permission: "sa1r.role.corrections", label: "Corrections" },
  { permission: "sa1r.role.civildefence", label: "Emergency Management" },
  { permission: "sa1r.staff.hr", label: "Staff: Agency HR (hire/fire/promote)" },
  { permission: "sa1r.staff.vehicles", label: "Staff: Vehicles (givevehicle)" },
  { permission: "sa1r.staff.aop", label: "Staff: AOP / Priority (/aop, /priority staff actions)" },
  { permission: STAFF_ADMIN_PERMISSION, label: "Staff: Admin Menu (permissions, AOP, player actions, catalogs)" },
];
