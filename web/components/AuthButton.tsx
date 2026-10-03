"use client";

import { signIn, signOut } from "next-auth/react";
import { LogOut, MessageCircle } from "lucide-react";
import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";

export function DiscordSignInButton({
  label = "Continue with Discord",
  mobileLabel,
  variant = "primary",
  className = "",
}: {
  label?: string;
  mobileLabel?: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => signIn("discord")}
      className={buttonClasses(variant, `group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trooper-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`)}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
      {mobileLabel ? (
        <>
          <span className="sm:hidden">{mobileLabel}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function AuthButton({ signedIn }: { signedIn: boolean }) {
  return signedIn ? (
    <button type="button" className={buttonClasses("secondary", "rounded-full")} onClick={() => signOut()}>
      <LogOut aria-hidden="true" className="h-4 w-4" />
      Sign out
    </button>
  ) : (
    <DiscordSignInButton label="Sign in with Discord" mobileLabel="Sign in" className="px-3 sm:px-4" />
  );
}
