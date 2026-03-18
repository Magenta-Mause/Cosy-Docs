import {
  INSTALL_COMMAND,
  UNINSTALL_DOCKER_COMMAND,
  UNINSTALL_KUBERNETES_COMMAND,
} from "@/lib/constants";

export function InstallCommand() {
  return (
    <pre>
      <code className="language-bash">{INSTALL_COMMAND}</code>
    </pre>
  );
}

export function UninstallDockerCommand() {
  return (
    <pre>
      <code className="language-bash">{UNINSTALL_DOCKER_COMMAND}</code>
    </pre>
  );
}

export function UninstallKubernetesCommand() {
  return (
    <pre>
      <code className="language-bash">{UNINSTALL_KUBERNETES_COMMAND}</code>
    </pre>
  );
}
