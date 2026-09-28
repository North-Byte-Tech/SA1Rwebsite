import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Oswald } from "next/font/google";
import Link from "next/link";
import { getSession, DEV_AUTH_BYPASSED } from "@/lib/session";
import { STAFF_ADMIN_PERMISSION } from "@/lib/permissions";
import { AuthButton } from "@/components/AuthButton";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Oswald({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "San Andreas 1st Response RP",
  description: "San Andreas 1st Response RP - community, recruitment, and player portal.",
};

const NAV_LINKS = [
  { href: "/rules", label: "Rules" },
  { href: "/guide", label: "Guide" },
  { href: "/join", label: "How to Join" },
  { href: "/departments", label: "Departments" },
  { href: "/status", label: "Live Status" },
] as const;

const FOOTER_SECTIONS = [
  {
    heading: "Community",
    links: [
      { href: "/rules", label: "Rules" },
      { href: "/guide", label: "Guide" },
      { href: "/join", label: "How to Join" },
      { href: "/departments", label: "Departments" },
      { href: "/status", label: "Live Status" },
    ],
  },
  {
    heading: "Account",
    links: [
      { href: "/portal", label: "My Portal" },
      { href: "/departments", label: "Apply Now" },
    ],
  },
] as const;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        {DEV_AUTH_BYPASSED && (
          <div className="bg-amber-500/90 px-4 py-1.5 text-center text-xs font-medium text-black">
            Dev mode: signed in as a fake session (DEV_BYPASS_AUTH). Set DEV_BYPASS_AUTH=false to use real Discord sign-in.
          </div>
        )}
        <header className="sticky top-0 z-10 border-b border-line/80 bg-ink/85 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="San Andreas 1st Response RP" className="h-12 w-auto drop-shadow-[0_0_12px_rgba(59,110,165,0.35)]" />
            </Link>
            <nav className="flex flex-1 flex-wrap items-center gap-x-1 gap-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface-raised hover:text-bone"
                >
                  {link.label}
                </Link>
              ))}
              {session && (
                <Link
                  href="/portal"
                  className="rounded-full px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface-raised hover:text-bone"
                >
                  My Portal
                </Link>
              )}
              {session?.permissions.includes(STAFF_ADMIN_PERMISSION) && (
                <Link
                  href="/admin"
                  className="rounded-full px-3 py-1.5 font-medium text-muted transition-colors hover:bg-surface-raised hover:text-bone"
                >
                  Staff
                </Link>
              )}
            </nav>
            <AuthButton signedIn={Boolean(session)} />
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">{children}</main>

        <footer className="border-t border-line/80 bg-surface/40">
          <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="San Andreas 1st Response RP" className="h-14 w-auto" />
              <p className="max-w-xs text-sm text-muted">
                An immersive FiveM roleplay community focused on law enforcement and emergency response across the
                State of San Andreas.
              </p>
            </div>
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.heading} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-steel">{section.heading}</h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-muted transition-colors hover:text-bone">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-line/60">
            <div className="mx-auto w-full max-w-5xl px-4 py-5 text-center text-xs text-muted sm:px-6 lg:px-8">
              <p>© {new Date().getFullYear()} San Andreas 1st Response RP — Immersive FiveM RP adventures await.</p>
              <a
                href="https://northbytetech.com"
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block transition-colors hover:text-bone"
              >
                Built by NorthByteTech
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
