import browserCollections from "fumadocs-mdx:collections/browser";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import type * as PageTree from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { useMemo } from "react";
import { DiscordHelp } from "@/components/discord-help";
import {
  DockerInstallCommand,
  InstallCommand,
  KubernetesInstallCommand,
  UninstallDockerCommand,
  UninstallKubernetesCommand,
} from "@/components/install-commands";
import { TemplateList } from "@/components/template-list";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
export const Route = createFileRoute("/docs/$")({
  // `loader` MUST stay declared before `head`. Both are context-sensitive arrow functions
  // whose parameter types come from the same inference type parameter (the route's loader
  // type). TypeScript types such properties in source order, so if `head` comes first it
  // forces that type parameter to its default (`undefined`) just to give `loaderData` a
  // type — after which `loader` can no longer contribute. The result is `loaderData`
  // narrowing to `never` in `head` and `Route.useLoaderData()` returning `undefined`.
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? [];
    const data = await loader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.title ? `${loaderData.title} | COSY Docs` : "COSY Docs",
      },
      ...(loaderData?.description
        ? [
            { name: "description", content: loaderData.description },
            { property: "og:description", content: loaderData.description },
          ]
        : []),
      ...(loaderData?.title
        ? [{ property: "og:title", content: `${loaderData.title} | COSY Docs` }]
        : []),
    ],
  }),
  component: Page,
});

const loader = createServerFn({
  method: "GET",
})
  .inputValidator((slugs: string[]) => slugs)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    return {
      tree: source.pageTree as object,
      path: page.path,
      title: page.data.title as string,
      description: (page.data.description ?? "") as string,
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <DocsPage toc={toc}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              InstallCommand,
              DockerInstallCommand,
              KubernetesInstallCommand,
              UninstallDockerCommand,
              UninstallKubernetesCommand,
              TemplateList,
              YouTubeEmbed,
            }}
          />
        </DocsBody>
      </DocsPage>
    );
  },
});

function Page() {
  const data = Route.useLoaderData();
  const Content = clientLoader.getComponent(data.path);
  const tree = useMemo(() => transformPageTree(data.tree as PageTree.Root), [data.tree]);

  return (
    <DocsLayout
      {...baseOptions()}
      themeSwitch={{ enabled: false }}
      tree={tree}
      sidebar={{ footer: <DiscordHelp /> }}
    >
      <Content />
    </DocsLayout>
  );
}

function transformPageTree(root: PageTree.Root): PageTree.Root {
  function mapNode<T extends PageTree.Node>(item: T): T {
    if (typeof item.icon === "string") {
      item = {
        ...item,
        icon: (
          <span
            // biome-ignore lint/security/noDangerouslySetInnerHtml: part of template
            dangerouslySetInnerHTML={{
              __html: item.icon,
            }}
          />
        ),
      };
    }

    if (item.type === "folder") {
      return {
        ...item,
        index: item.index ? mapNode(item.index) : undefined,
        children: item.children.map(mapNode),
      };
    }

    return item;
  }

  return {
    ...root,
    children: root.children.map(mapNode),
    fallback: root.fallback ? transformPageTree(root.fallback) : undefined,
  };
}
