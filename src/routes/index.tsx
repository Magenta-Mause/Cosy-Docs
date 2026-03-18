import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import backgroundImg from "@/assets/background.png";
import cosyLogo from "@/assets/props/cosy-logo.gif";
import { DiscordIcon } from "@/components/discord-icon";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE_URL, INSTALL_COMMAND } from "@/lib/constants";

export const Route = createFileRoute("/")({
  component: HomePage,
});

export function HomePage() {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(INSTALL_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <LandingHeader />

      <main className="flex-1 flex flex-col items-center text-center px-4 py-24">
        <img src={cosyLogo} alt="Cosy logo" className="w-[32vw]" />
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Easily host your game servers on your own infrastructure.
        </p>

        <div className="mt-8 w-full max-w-xl">
          <div className="flex items-center rounded-md border-border border-3 bg-card px-1 py-1 gap-2">
            <div className="flex-1 min-w-0 overflow-x-auto scroller">
              <code className="block whitespace-nowrap text-sm px-2">$ {INSTALL_COMMAND}</code>
            </div>
            <Button variant="ghost" onClick={copyToClipboard} className="border-3 shrink-0">
              {copied ? (
                <Check className="h-4 w-4 stroke-3" />
              ) : (
                <Copy className="h-4 w-4 stroke-3" />
              )}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" className="border-3">
            <a href="/docs">Documentation</a>
          </Button>
          <Button asChild size="lg" className="border-3" variant="secondary">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-3 flex"
            >
              <DiscordIcon className="h-6! w-6! top-[1px] relative" />
              Join our Community
            </a>
          </Button>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
