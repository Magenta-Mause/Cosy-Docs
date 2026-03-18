import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DISCORD_INVITE_URL } from "./constants";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "COSY Docs",
    },
    links: [
      {
        text: "Discord",
        url: DISCORD_INVITE_URL,
        external: true,
      },
    ],
  };
}
