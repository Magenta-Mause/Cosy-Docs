import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE_URL } from "@/lib/constants";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 -28.5 256 256"
      preserveAspectRatio="xMidYMid"
      fill="currentColor"
      aria-label="Discord"
      role="img"
    >
      <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" />
    </svg>
  );
}

export function DiscordHelp() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="rounded-lg border-3 border-fd-border bg-fd-secondary overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between gap-3 p-3 transition-colors hover:bg-fd-accent"
      >
        <div className="flex items-center gap-3">
          <DiscordIcon className="h-5 w-5 text-[#5865F2]" />
          <span className="font-bold text-fd-primary">Need Help?</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-fd-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        ref={contentRef}
        className="grid transition-all duration-200 ease-out"
        style={{
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-fd-border px-3 pb-3 pt-2">
            <p className="text-sm leading-tight mb-3">
              Join our Discord community for questions, support, and feature requests!
            </p>
            <Button asChild size="sm" variant="primary" className="w-full">
              <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
                Join
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
