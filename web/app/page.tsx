import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { Compass, Flame, HeartPulse, MapPin, Radio, ScrollText, Shield, ShieldCheck } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconTile, type IconTileTone } from "@/components/ui/IconTile";
import { Pill } from "@/components/ui/Pill";
import { GetStartedButton } from "@/components/GetStartedButton";
import { DEPARTMENT_ACCENT_CLASSES, getDepartmentImage, getDepartments, type DepartmentCode } from "@/lib/departments";

const RECRUITMENT_DISCORD_URL = (process.env.NEXT_PUBLIC_RECRUITMENT_DISCORD_URL ?? "https://discord.gg/DPYATmwcqV").trim();

const DEPARTMENT_ICONS: Record<DepartmentCode, typeof Shield> = {
  LEO: Shield,
  SAFD: Flame,
  SAEMS: HeartPulse,
  DISPATCH: Radio,
  CIV: ShieldCheck,
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
    body: "Explore emergency services, civilian life, and recruitment.",
    icon: ShieldCheck,
    tone: "gold",
  },
] satisfies { href: string; title: string; body: string; icon: typeof Compass; tone: IconTileTone }[];

const COMMUNITY_PHOTOS = [
  {
    src: "/sa1r-gallery-05.webp",
    alt: "Police and fire units coordinating at a multi-agency scene",
    caption: "A coordinated response",
  },
  {
    src: "/sa1r-gallery-07.webp",
    alt: "Law enforcement officers standing with a police dog during a night shift",
    caption: "On patrol together",
  },
  {
    src: "/sa1r-gallery-08.webp",
    alt: "A San Andreas Fire and Rescue vehicle at a rural response scene",
    caption: "Fire and rescue across the state",
  },
  {
    src: "/sa1r-gallery-02.jpg",
    alt: "A San Andreas police patrol vehicle responding on a rural highway",
    caption: "Keeping San Andreas moving",
  },
  {
    src: "/sa1r-gallery-04.jpg",
    alt: "Emergency services gathered at an industrial-site incident",
    caption: "Working across departments",
  },
  {
    src: "/sa1r-gallery-01.webp",
    alt: "Fire chief and responder coordinating beside a marked response vehicle",
    caption: "Ready to respond",
  },
  {
    src: "/sa1r-gallery-09.jpg",
    alt: "Firefighters and law enforcement working together at an incident",
    caption: "One team, many roles",
  },
  {
    src: "/sa1r-gallery-03.webp",
    alt: "Two residents meeting beside a vehicle in San Andreas",
    caption: "Life in San Andreas",
  },
] as const;

export default async function HomePage() {
  const session = await getSession();
  const departments = getDepartments();

  return (
    <div className="space-y-20">
      <section className="hero-panel relative left-1/2 flex min-h-[430px] w-screen -translate-x-1/2 flex-col items-center justify-center gap-6 border-y border-line px-5 py-16 text-center sm:px-8">
        <Image
          src="/sa1r-scene.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/65 to-ink/95" />
        <div className="relative z-10 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-steel">
          <span className="h-px w-8 bg-trooper-400" />
          <MapPin className="h-4 w-4 text-trooper-400" />
          State of San Andreas
          <span className="h-px w-8 bg-trooper-400" />
        </div>
        <h1 className="relative z-10 max-w-5xl text-5xl font-semibold uppercase leading-[0.98] tracking-[0.06em] text-bone sm:text-7xl lg:text-8xl">
          San Andreas
          <span className="mt-2 block text-gradient-brand">1st Response</span>
        </h1>
        <p className="relative z-10 max-w-xl text-lg text-steel-300 sm:text-xl">
          All-hazards roleplay. Covering San Andreas.
        </p>
        <div className="relative z-10 flex flex-wrap justify-center gap-3 pt-2">
          {session ? (
            <>
              <Link href="/departments" className={buttonClasses("primary")}>
                Explore Departments
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
          <p className="relative z-10 text-xs text-steel-300">
            Creating an account just takes a Discord sign-in - by joining, you agree to follow our{" "}
            <Link href="/rules" className="text-trooper-400 hover:underline">
              rules
            </Link>
            .
          </p>
        )}
      </section>

      {RECRUITMENT_DISCORD_URL ? (
        <section className="rounded-2xl border border-trooper-500/40 bg-trooper-950/40 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-trooper-300">Recruitment Discord</p>
              <h2 className="mt-1 text-2xl text-bone">Join the recruitment server</h2>
            </div>
            <Link
              href={RECRUITMENT_DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-trooper-500 px-4 py-2 text-sm font-medium text-bone transition hover:bg-trooper-400"
            >
              Join Recruitment Discord
            </Link>
          </div>
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-trooper-300">Find your role</p>
            <h2 className="mt-1 text-3xl text-bone">Departments</h2>
          </div>
          <Link href="/departments" className="text-sm font-medium text-trooper-400 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {departments.map((department) => {
            const accent = DEPARTMENT_ACCENT_CLASSES[department.accent];
            const Icon = DEPARTMENT_ICONS[department.code];
            return (
                <Card
                  key={department.slug}
                  className={`flex h-full flex-col overflow-hidden border-t-2 p-0 transition-colors hover:border-trooper-400 ${accent.border}`}
                >
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={getDepartmentImage(department.code).src}
                      alt={getDepartmentImage(department.code).alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                    <div className={`absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl text-bone shadow-glow-sm ${accent.iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg text-bone">{department.name}</h3>
                    <p className="mt-1 text-sm text-muted">{department.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm font-semibold">
                      <Link href={`/departments/${department.slug}`} className="text-bone hover:text-trooper-300">
                        Explore →
                      </Link>
                      {department.externalSiteUrl && (
                        <a
                          href={department.externalSiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-trooper-300 hover:text-bone"
                        >
                          Visit Fire & Rescue ↗
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <div className="border-b border-line pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-trooper-300">From the community</p>
          <h2 className="mt-1 text-3xl text-bone">Scenes from San Andreas</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            A look at the patrols, calls, and everyday moments that make up life across the state.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMMUNITY_PHOTOS.map((photo, index) => (
            <figure
              key={photo.src}
              className={`group relative isolate aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface ${
                index === 0 ? "sm:col-span-2 sm:aspect-[16/9]" : ""
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-bone sm:p-5">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="border-b border-line pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-trooper-300">Community resources</p>
          <h2 className="mt-1 text-3xl text-bone">Get started</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
        {QUICK_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="flex h-full items-start gap-4 transition-colors hover:border-trooper-400">
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
        </div>
      </section>
    </div>
  );
}
