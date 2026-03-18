import { CodeBlock } from "fumadocs-ui/components/codeblock";
import {
  INSTALL_COMMAND,
  UNINSTALL_DOCKER_COMMAND,
  UNINSTALL_KUBERNETES_COMMAND,
} from "@/lib/constants";

function CommandBlock({ command }: { command: string }) {
  return (
    <CodeBlock className="overflow-x-auto pl-4 pr-8 whitespace-nowrap">
      <code>{command}</code>
    </CodeBlock>
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
