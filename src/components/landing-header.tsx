import { SquareArrowOutUpRight } from "lucide-react";
import { CosyLogo } from "./cosy-logo";

const NAV_LINKS = [
  { href: "/docs", label: "Documentation", external: false },
  { href: "https://github.com/Magenta-Mause/Cosy", label: "GitHub", external: true },
  { href: "https://discord.gg/t2zFuPT6", label: "Discord", external: true },
] as const;

export function LandingHeader() {
  return (
    <header className="bg-button-secondary-default h-fit border-b-3">
      <div className="mx-auto p-8 flex h-14 items-center justify-between px-4">
        <CosyLogo />
        <nav className="flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-muted-foreground transition flex items-center gap-1"
            >
              {link.label}
              {link.external && <SquareArrowOutUpRight size={18} />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
