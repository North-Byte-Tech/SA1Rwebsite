// The `export {}` below is required: without at least one top-level
// import/export, this file is a global script, not a module, and
// `declare module "next-auth"` would then define a brand new ambient
// module that REPLACES next-auth's real types instead of augmenting them.
export {};

// Augments next-auth's Session/User with the site-admin state stored on the
// Prisma User row - see lib/auth.ts's session callback (where it's read)
// and lib/adminData.ts (where it's written, via the admin UI).
declare module "next-auth" {
  interface Session {
    discordId: string | null;
    userId: string;
    permissions: string[];
    isStaff: boolean;
  }

  // The database session strategy's session() callback receives an
  // AdapterUser (next-auth/adapters), which extends this User interface -
  // augmenting it here is what makes user.discordId etc. type-check in
  // lib/auth.ts without an `any` cast.
  interface User {
    discordId?: string | null;
    isStaff?: boolean;
    permissions?: string[];
  }
}
