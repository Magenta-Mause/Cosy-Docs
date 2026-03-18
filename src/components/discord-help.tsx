import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { DiscordIcon } from "@/components/discord-icon";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE_URL } from "@/lib/constants";

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
