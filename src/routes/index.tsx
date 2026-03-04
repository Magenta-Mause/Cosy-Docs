import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import backgroundImg from "@/assets/background.png";
import cosyLogo from "@/assets/props/cosy-logo.gif";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

export function HomePage() {
  const curlCommand =
    'sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/Magenta-Mause/Cosy/refs/heads/main/install_cosy.sh)" _';
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(curlCommand);
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
      {/* Header */}
      <header className="bg-button-secondary-default h-fit border-b-3">
        <div className="mx-auto p-8 flex h-14 items-center justify-between px-4">
          <h1 className="!text-[30px] font-bold tracking-tight pt-2">COSY</h1>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/docs" className="hover:text-muted-foreground transition">
              Documentation
            </a>
            <a
              href="https://github.com/Magenta-Mause/Cosy"
              className="hover:text-muted-foreground transition flex items-center gap-1"
            >
              GitHub <SquareArrowOutUpRight size={18} />
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center text-center px-4 py-24">
        <img src={cosyLogo} alt="Cosy logo" className="w-[32vw]" />
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Easily host your game servers on your own infrastructure.
        </p>
        <div className="mt-8 w-full max-w-xl">
          <div className="flex items-center rounded-md border-border border-3 bg-card px-1 py-1 gap-2">
            <div className="flex-1 min-w-0 overflow-x-auto">
              <code className="block whitespace-nowrap text-sm px-2">$ {curlCommand}</code>
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
            <a href="/docs">Get Started</a>
          </Button>

          <Button asChild size="lg" className="border-3" variant="secondary">
            <a
              href="https://github.com/magenta-Mause/cosy-templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              Templates
            </a>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-button-secondary-default h-fit border-t-3">
        <div className="mx-2 px-4 py-8 pb-4 text-sm">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div>
              <h5 className="text-sm">COSY by MedalHeads</h5>
              <p className="mt-2 max-w-md text-muted-foreground">
                COSY stands for Cost Optimised Server Yard. A simplified, cost-efficient
                self-hosting service for running game servers.
              </p>
            </div>

            <div className="text-muted-foreground space-y-1 flex gap-16">
              <div className="flex flex-col">
                <span>Contact:</span>
                <span>jabbekeipert@gmail.com</span>
                <span>+49 160 92422210</span>
              </div>
              <div className="flex flex-col text-end">
                <span>Janne Keipert</span>
                <span>Marchlewskistr 102</span>
                <span>10243 Berlin</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
