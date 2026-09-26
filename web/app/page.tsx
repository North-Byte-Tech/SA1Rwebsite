import Link from "next/link";
import { getServerSession } from "next-auth";
import { Compass, Flame, HeartPulse, MapPin, Radio, ScrollText, Shield, ShieldCheck } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconTile, type IconTileTone } from "@/components/ui/IconTile";
import { Pill } from "@/components/ui/Pill";
import { GetStartedButton } from "@/components/GetStartedButton";
import { DEPARTMENTS, DEPARTMENT_ACCENT_CLASSES } from "@/lib/departments";
import type { DepartmentCode } from "@/lib/portalApi";

const DEPARTMENT_ICONS: Record<DepartmentCode, typeof Shield> = {
  LEO: Shield,
  SAFD: Flame,
  SAEMS: HeartPulse,
};

const QUICK_LINKS = [
  {
    href: "/join",
    title: "How to Join",
    body: "Steps to get connected and playing.",
    icon: Compass,
    tone: "trooper",
  },
  {
    href: "/rules",
    title: "Server Rules",
    body: "What's expected once you're in.",
    icon: ScrollText,
    tone: "steel",
  },
  {
    href: "/departments",
    title: "Departments",
    body: "PD, Fire, and Ambulance recruitment.",
    icon: ShieldCheck,
    tone: "gold",
  },
  {
    href: "/status",
    title: "Live Status",
    body: "Who's on duty right now.",
    icon: Radio,
    tone: "trooper",
  },
] satisfies { href: string; title: string; body: string; icon: typeof Compass; tone: IconTileTone }[];

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-20">
      <section className="-mx-4 space-y-6 rounded-3xl bg-hero-glow px-4 py-16 text-center sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex justify-center">
          <Pill>
            <MapPin className="h-4 w-4 text-trooper-400" />
            State of San Andreas
          </Pill>
        </div>
        <h1 className="text-4xl font-semibold text-bone sm:text-6xl">
          San Andreas <span className="text-gradient-brand">1st Response</span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted">
          Immersive FiveM RP adventures await. Join a community built on creativity, teamwork, and respect - where
          every member feels valued and included.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {session ? (
            <>
              <Link href="/portal" className={buttonClasses("primary")}>
                Go to My Portal
              </Link>
              <Link href="/join" className={buttonClasses("secondary")}>
                How to Join
              </Link>
            </>
          ) : (
            <>
              <GetStartedButton label="Create Account" />
              <Link href="/join" className={buttonClasses("secondary")}>
                How to Join
              </Link>
            </>
          )}
        </div>
        {!session && (
          <p className="text-xs text-muted">
            Creating an account just takes a Discord sign-in - by joining, you agree to follow our{" "}
            <Link href="/rules" className="text-trooper-400 hover:underline">
              rules
            </Link>
            .
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl text-bone">Departments</h2>
          <Link href="/departments" className="text-sm font-medium text-trooper-400 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {DEPARTMENTS.map((department) => {
            const accent = DEPARTMENT_ACCENT_CLASSES[department.accent];
            const Icon = DEPARTMENT_ICONS[department.code];
            return (
              <Link key={department.slug} href={`/departments/${department.slug}`}>
                <Card
                  className={`h-full border-t-2 transition-all hover:-translate-y-0.5 ${accent.border}`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-bone shadow-glow-sm ${accent.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-base text-bone">{department.name}</h3>
                  <p className="mt-1 text-sm text-muted">{department.summary}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {QUICK_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="flex h-full items-start gap-4 transition-all hover:-translate-y-0.5 hover:border-trooper-600/60">
              <IconTile tone={link.tone}>
                <link.icon className="h-6 w-6" />
              </IconTile>
              <div>
                <h2 className="text-xl text-bone">{link.title}</h2>
                <p className="mt-1 text-sm text-muted">{link.body}</p>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
