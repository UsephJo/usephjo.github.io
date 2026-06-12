import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit, SKIP } from "unist-util-visit";
import type { Link, Text, Image, Blockquote, Html, Paragraph } from "mdast";

interface WikiLinkParts {
  full: string;
  target: string;
  alias?: string;
}

const WIKI_LINK_RE = /\[\[([^\]|#]+?)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g;
const EMBED_RE = /!\[\[([^\]]+)\]\]/g;
const HIGHLIGHT_RE = /==([^=]+)==/g;

function parseCallout(line: string): { type: string; title: string } | null {
  const match = line.match(/^\[!(\w+)\]\s*(.*?)$/i);
  if (!match) return null;
  return { type: match[1].toLowerCase(), title: match[2] || match[1] };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s/]+/g, "-")
    .replace(/[^\w-]/g, "");
}

const remarkObsidian: RemarkPlugin = () => {
  return (tree) => {
    // 1. Process wikilinks and highlights in text nodes
    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined) return;
      if (parent.type !== "paragraph" && parent.type !== "listItem" && parent.type !== "tableCell") return;

      const text = node.value;
      // Check if there's anything to process
      if (!text.includes("[[")) {
        // Only check for highlights
        if (!text.includes("==")) return;
      }

      const replacements: Array<{
        start: number;
        end: number;
        type: "wikilink" | "embed" | "highlight";
        target?: string;
        alias?: string;
      }> = [];

      // Find wikilinks (do this before embed to avoid collision)
      // Reset lastIndex
      WIKI_LINK_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = WIKI_LINK_RE.exec(text)) !== null) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          type: "wikilink",
          target: match[1],
          alias: match[3],
        });
      }

      // Find embeds
      EMBED_RE.lastIndex = 0;
      while ((match = EMBED_RE.exec(text)) !== null) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          type: "embed",
          target: match[1],
        });
      }

      // Find highlights
      HIGHLIGHT_RE.lastIndex = 0;
      while ((match = HIGHLIGHT_RE.exec(text)) !== null) {
        replacements.push({
          start: match.index,
          end: match.index + match[0].length,
          type: "highlight",
          alias: match[1],
        });
      }

      if (replacements.length === 0) return;

      // Sort by start position
      replacements.sort((a, b) => a.start - b.start);

      // Build new children
      const children: (Text | Link | Image | import("mdast").Html)[] = [];
      let cursor = 0;

      for (const r of replacements) {
        // Text before this replacement
        if (r.start > cursor) {
          children.push({ type: "text", value: text.slice(cursor, r.start) });
        }

        if (r.type === "wikilink") {
          const href = "/posts/" + slugify(r.target || "");
          children.push({
            type: "link",
            url: href,
            title: null,
            children: [{ type: "text", value: r.alias || r.target || "" }],
          } as Link);
        } else if (r.type === "embed") {
          // For image embeds, create an image node
          children.push({
            type: "html",
            value: `<img src="/images/${r.target || ""}" alt="${r.target || ""}" loading="lazy" />`,
          } as import("mdast").Html);
        } else if (r.type === "highlight") {
          children.push({
            type: "html",
            value: `<mark>${r.alias || ""}</mark>`,
          } as import("mdast").Html);
        }

        cursor = r.end;
      }

      // Remaining text
      if (cursor < text.length) {
        children.push({ type: "text", value: text.slice(cursor) });
      }

      // Replace the text node with the new children
      parent.children.splice(index, 1, ...children);
      return [SKIP, index + children.length];
    });

    // 2. Process callouts in blockquotes
    visit(tree, "blockquote", (node, index, parent) => {
      if (!parent || index === undefined) return;

      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== "paragraph") return;

      const firstText = firstChild.children[0];
      if (!firstText || firstText.type !== "text") return;

      const parsed = parseCallout(firstText.value);
      if (!parsed) return;

      // Remove the [!type] marker from the first paragraph
      const remaining = firstText.value.replace(/^\[!\w+\]\s*/, "");
      if (remaining) {
        firstText.value = remaining;
      } else {
        // Remove the text node if no content remains after the marker
        firstChild.children.shift();
        // If paragraph is now empty, remove it
        if (firstChild.children.length === 0) {
          node.children.shift();
        }
      }

      // Replace blockquote with a div.callout
      const calloutNode: import("mdast").Html = {
        type: "html",
        value: `<aside class="callout callout-${parsed.type}"><span class="callout-title">${parsed.type.toUpperCase()}</span>\n\n`,
      };
      const closeNode: import("mdast").Html = {
        type: "html",
        value: "</aside>",
      };

      parent.children.splice(index, 1, calloutNode, ...node.children, closeNode);
      return [SKIP, index + node.children.length + 2];
    });
  };
};

export default remarkObsidian;
