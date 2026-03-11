import { createFileRoute, Link } from "@tanstack/react-router";
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
    'sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/Magenta-Mause/Cosy/v1.0.0/install_cosy.sh)" _';
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
          <svg width="106" height="31" viewBox="0 0 212 62" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="COSY">
              <g clipPath="url(#clip0_10_2)">
                <path d="M12.5 49.5H37.5V43.25H12.5V49.5ZM6.25 43.25H12.5V12H6.25V43.25ZM12.5 12H37.5V5.75H12.5V12ZM50 43.25V62H12.5V55.75H6.25V49.5H0V12H6.25V5.75H12.5V-0.5H43.75V5.75H50V24.5H31.25V37H43.75V43.25H50ZM62.5 49.5H81.25V43.25H62.5V49.5ZM56.25 43.25H62.5V12H56.25V43.25ZM81.25 43.25H87.5V12H81.25V43.25ZM62.5 12H81.25V5.75H62.5V12ZM100 12V55.75H93.75V62H62.5V55.75H56.25V49.5H50V12H56.25V5.75H62.5V-0.5H87.5V5.75H93.75V12H100ZM106.25 49.5H131.25V43.25H106.25V49.5ZM106.25 24.5H112.5V12H106.25V24.5ZM112.5 30.75H131.25V24.5H112.5V30.75ZM131.25 43.25H137.5V30.75H131.25V43.25ZM112.5 12H137.5V5.75H112.5V12ZM150 30.75V55.75H143.75V62H106.25V55.75H100V43.25H106.25V30.75H100V12H106.25V5.75H112.5V-0.5H143.75V5.75H150V24.5H143.75V30.75H150ZM181.25 30.75H187.5V24.5H168.75V30.75H175V49.5H181.25V30.75ZM162.5 24.5H168.75V18.25H162.5V24.5ZM156.25 18.25H162.5V5.75H156.25V18.25ZM187.5 24.5H193.75V18.25H187.5V24.5ZM193.75 18.25H200V5.75H193.75V18.25ZM212.5 5.75V24.5H206.25V30.75H200V37H193.75V62H175V55.75H168.75V37H162.5V30.75H156.25V24.5H150V5.75H156.25V-0.5H168.75V5.75H175V12H181.25V18.25H187.5V5.75H193.75V-0.5H206.25V5.75H212.5Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_10_2">
                  <rect width="212" height="62" fill="currentColor"/>
                </clipPath>
              </defs>
            </svg>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/docs" className="hover:text-muted-foreground transition">
              Documentation
            </Link>
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
            <div className="flex-1 min-w-0 overflow-x-auto scroller">
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
            <a href="/docs">Documentation</a>
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
