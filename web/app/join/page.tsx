import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

const STEPS = [
  { title: "Use this website to do your application", body: "Fill out the application form to get started.make sure to log in to discord so we cna keep track of u " },
  { title: "Join our RECRUITMENT Discord", body: "Join our recruitment Discord to stay updated on the latest information and connect with other applicants." },
  { title: "We will contact you via Discord on info about your interview", body: "You will be contacted via Discord with details about your interview.You can also see where your application is via my portal " },
  { title: "now you will be sent a link to our main Discord", body: "You will be sent a link to our main Discord server where you can interact with the community." },
  { title: "Now you are accepted", body: "once Your in the main serever wou will be automalic add to the whitleisted so will be able join RP,ERS,Fivepd please give it 5 min waiting time for whitlesist get thriought our system." },
];

export default function JoinPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="How to Join" />
      <ol className="space-y-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-bone shadow-glow-sm">
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-bone">{step.title}</p>
              <p className="text-sm text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted">
        Interested in an emergency-services role? See{" "}
        <Link href="/departments" className="text-trooper-400 hover:underline">
          Departments
        </Link>
        .
      </p>
    </div>
  );
}
