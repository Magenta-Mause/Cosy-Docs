import { useEffect, useState } from "react";

interface Template {
  name: string;
  description: string;
  game_id: number;
  path: string;
}

interface TemplateApiResponse {
  templates: Template[];
}

const TEMPLATES_API = "https://cosy-templates.jannekeipert.de/templates";
const TEMPLATES_REPO = "https://github.com/Magenta-Mause/cosy-templates";
const TEMPLATES_REPO_BLOB = "https://github.com/Magenta-Mause/cosy-templates/blob/main/";

export function TemplateList() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(TEMPLATES_API)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: TemplateApiResponse) => {
        if (!Array.isArray(data.templates)) throw new Error("Invalid response");
        setTemplates(data.templates);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading templates...</p>;
  }

  if (error) {
    return (
      <p>
        Could not load templates. Check the <a href={TEMPLATES_REPO}>cosy-templates</a> repository
        directly.
      </p>
    );
  }

  // Group by game directory (first two path segments: templates/{game}/)
  const grouped: Record<string, Template[]> = {};
  for (const t of templates) {
    const game = t.path.split("/")[1] ?? "other";
    if (!grouped[game]) {
      grouped[game] = [];
    }
    grouped[game].push(t);
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Template</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([game, items]) =>
              items.map((t, i) => {
                const isFirst = i === 0;
                const isLast = i === items.length - 1;
                const gameCellStyle: React.CSSProperties = {
                  fontWeight: 600,
                  borderTop: isFirst ? undefined : "none",
                  borderBottom: isLast ? undefined : "none",
                };
                return (
                  <tr key={t.path}>
                    <td style={gameCellStyle}>
                      {isFirst
                        ? game.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                        : ""}
                    </td>
                    <td>
                      <a href={TEMPLATES_REPO_BLOB + t.path}>{t.name}</a>
                    </td>
                    <td>{t.description}</td>
                  </tr>
                );
              }),
            )}
        </tbody>
      </table>
    </div>
  );
}
