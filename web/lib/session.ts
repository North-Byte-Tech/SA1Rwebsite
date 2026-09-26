import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "./auth";
import { STAFF_ADMIN_PERMISSION } from "./permissions";

// True whenever getSession() below hands back the fixed DEV_SESSION instead
// of a real one - layout.tsx reads this to show a small "fake session"
// banner so the bypass is never mistaken for an actual sign-in.
export const DEV_AUTH_BYPASSED =
  process.env.NODE_ENV !== "production" && process.env.DEV_BYPASS_AUTH !== "false";

// Dev-only convenience: lets every page/route render as "signed in" with no
// Postgres DB or Discord OAuth app configured, by skipping
// next-auth/Prisma entirely rather than exercising the real Discord sign-in
// flow. Set DEV_BYPASS_AUTH=false to go through that real flow locally
// instead (needs DATABASE_URL/DISCORD_CLIENT_ID/DISCORD_CLIENT_SECRET set).
// Never honored when NODE_ENV=production, regardless of the env var.
const DEV_SESSION: Session = {
  user: {
    name: "Dev User",
    email: "dev@localhost",
    image: "https://cdn.discordapp.com/embed/avatars/0.png",
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  discordId: "000000000000000000",
  userId: "dev-user",
  permissions: [STAFF_ADMIN_PERMISSION],
  isStaff: true,
};

export async function getSession(): Promise<Session | null> {
  if (DEV_AUTH_BYPASSED) {
    return DEV_SESSION;
  }
  return getServerSession(authOptions);
}
