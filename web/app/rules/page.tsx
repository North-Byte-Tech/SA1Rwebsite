import { MessageCircleWarning, ShieldAlert, Swords, Users, Video, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { IconTile, type IconTileTone } from "@/components/ui/IconTile";

const RULE_SECTIONS = [
  {
    title: "Roleplay quality",
    body: "Stay in character, engage with fear/injury RP, and avoid metagaming or powergaming.",
    icon: Wand2,
    tone: "trooper",
  },
  {
    title: "Conduct",
    body: "Treat other players and staff with respect. Harassment, hate speech, and cheating are not tolerated.",
    icon: Users,
    tone: "steel",
  },
  {
    title: "Combat and RDM/VDM",
    body: "No random deathmatch or vehicle deathmatch - every action needs an in-character reason.",
    icon: Swords,
    tone: "gold",
  },
  {
    title: "Streaming and recording",
    body: "Follow the community's streamer tag rules if you plan to stream or record sessions.",
    icon: Video,
    tone: "trooper",
  },
  {
    title: "Reporting issues",
    body: "Use the in-game report command or open a Discord ticket - don't take rule disputes into your own hands.",
    icon: MessageCircleWarning,
    tone: "steel",
  },
  {
    title: "Enforcement",
    body: "Follow staff directions. Check the official community rules in Discord for the current moderation and appeal process.",
    icon: ShieldAlert,
    tone: "gold",
  },
] satisfies { title: string; body: string; icon: typeof Wand2; tone: IconTileTone }[];

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Server Rules">
        This is a quick overview, not the complete rulebook. Read the current official rules in the community Discord before playing.
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2">
        {RULE_SECTIONS.map((section) => (
          <Card key={section.title} className="flex items-start gap-4">
            <IconTile tone={section.tone}>
              <section.icon className="h-6 w-6" />
            </IconTile>
            <div>
              <h2 className="text-lg text-bone">{section.title}</h2>
              <p className="mt-2 text-sm text-muted">{section.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
