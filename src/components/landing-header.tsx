import { Link } from "@tanstack/react-router";
import { SquareArrowOutUpRight } from "lucide-react";
import { DISCORD_INVITE_URL, GITHUB_REPO_URL } from "@/lib/constants";
import { CosyLogo } from "./cosy-logo";

const NAV_LINKS = [
  { href: "/docs", label: "Documentation", external: false },
  { href: GITHUB_REPO_URL, label: "GitHub", external: true },
  { href: DISCORD_INVITE_URL, label: "Discord", external: true },
] as const;

export function LandingHeader() {
  return (
    <header className="bg-button-secondary-default h-fit border-b-3">
      <div className="mx-auto p-8 flex h-14 items-center justify-between px-4">
        <CosyLogo />
        <nav className="flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-muted-foreground transition flex items-center gap-1"
              >
                {link.label}
                <SquareArrowOutUpRight size={18} />
              </a>
            ) : (
              <Link
                key={link.href}
                to="/docs/$"
                params={{ _splat: "" }}
                className="hover:text-muted-foreground transition"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
