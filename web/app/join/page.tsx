import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

const RECRUITMENT_DISCORD_URL = (process.env.NEXT_PUBLIC_RECRUITMENT_DISCORD_URL ?? "https://discord.gg/DPYATmwcqV").trim();

const STEPS = [
  {
    title: "Sign in with Discord to apply",
    body: "You must sign in with Discord before submitting an application so we can track your account and contact you properly.",
    href: "/portal",
    cta: "Open portal",
  },
  {
    title: "Complete the department application",
    body: "Fill out the recruitment form for the department you want to join and tell us a little about yourself.",
    href: "/departments",
    cta: "View departments",
  },
  {
    title: "We will contact you on Discord",
    body: "Staff will reach out on Discord with interview details and status updates throughout the process.",
    href: RECRUITMENT_DISCORD_URL ?? "/departments",
    cta: "Join recruitment Discord",
  },
  {
    title: "Check your application status",
    body: "You can track your progress in My Portal at any time while your application is being reviewed.",
    href: "/portal",
    cta: "Check status",
  },
  {
    title: "Accepted applicants are added to the correct group",
    body: "Once accepted, the system will add you to the appropriate department access and you can start joining the server and roleplay community.",
    href: "/departments",
    cta: "See departments",
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader title="How to Join" />

      <div className="rounded-[1.75rem] border border-line bg-[#0f1726]/80 p-3 shadow-[0_0_0_1px_rgba(148,163,184,0.05)] sm:p-5">
        <ol className="space-y-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-transparent transition-all duration-200 hover:border-trooper-500/30 hover:bg-trooper-500/5">
              <Link
                href={step.href}
                target={step.href.startsWith("http") ? "_blank" : undefined}
                rel={step.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex gap-4 p-3 sm:p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-base font-semibold text-bone shadow-glow-sm ring-4 ring-trooper-500/10">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-semibold text-bone transition-colors group-hover:text-trooper-300 sm:text-xl">{step.title}</p>
                    <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-trooper-300">
                      {step.cta}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted sm:text-[15px]">{step.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-base text-muted">
        Interested in an emergency-services role? See{" "}
        <Link href="/departments" className="font-medium text-trooper-400 hover:text-trooper-300 hover:underline">
          Departments
        </Link>
        .
      </p>
    </div>
  );
}
