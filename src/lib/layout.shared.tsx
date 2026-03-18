import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "COSY Docs",
    },
    links: [
      {
        text: "Discord",
        url: "https://discord.gg/t2zFuPT6",
        external: true,
      },
    ],
  };
}
