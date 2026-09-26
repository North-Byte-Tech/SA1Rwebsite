import type { ReactNode } from "react";

export type IconTileTone = "trooper" | "steel" | "gold";

const TONES: Record<IconTileTone, string> = {
  trooper: "bg-gradient-to-br from-trooper-500 to-trooper-700 text-ink",
  steel: "bg-gradient-to-br from-steel-300 to-steel-600 text-ink",
  gold: "bg-gradient-to-br from-gold-400 to-gold-600 text-ink",
};

// Rounded gradient square icon container - the colored icon tiles used
// across feature/department cards.
export function IconTile({
  children,
  tone = "trooper",
  className = "",
}: {
  children: ReactNode;
  tone?: IconTileTone;
  className?: string;
}) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-glow-sm ${TONES[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
