import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-line bg-surface/90 shadow-card ${padded ? "p-6" : "p-0"} ${className}`}>
      {children}
    </div>
  );
}
