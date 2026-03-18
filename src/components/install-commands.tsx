import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  INSTALL_COMMAND,
  UNINSTALL_DOCKER_COMMAND,
  UNINSTALL_KUBERNETES_COMMAND,
} from "@/lib/constants";

function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-fd-border bg-fd-secondary p-2">
      <div className="flex-1 overflow-x-auto p-2 font-mono text-xs whitespace-nowrap">
        {command}
      </div>
      <Button
        variant="secondary"
        size="icon-sm"
        onClick={copyToClipboard}
        className="shrink-0 border-2"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export function InstallCommand() {
  return <CommandBlock command={INSTALL_COMMAND} />;
}

export function UninstallDockerCommand() {
  return <CommandBlock command={UNINSTALL_DOCKER_COMMAND} />;
}

export function UninstallKubernetesCommand() {
  return <CommandBlock command={UNINSTALL_KUBERNETES_COMMAND} />;
}
