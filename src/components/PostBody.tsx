import { Fragment, type ReactNode } from "react";
import type { Block } from "@/content/posts";

/** Renders "**bold**" markers as <strong>. */
function rich(text: string): ReactNode {
  const parts = text.split("**");
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}

/** Article body. Keeps a logical heading order: an h3 with no h2 before it is shown as h2. */
export default function PostBody({ blocks }: { blocks: Block[] }) {
  let seenH2 = false;
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        if ("items" in b) {
          const L = b.t;
          return (
            <L key={i}>
              {b.items.map((it, j) => (
                <li key={j}>{rich(it)}</li>
              ))}
            </L>
          );
        }
        const text = b.x;
        if (b.t === "h2" || (b.t === "h3" && !seenH2)) {
          seenH2 = true;
          return <h2 key={i}>{text.replace(/\*\*/g, "")}</h2>;
        }
        if (b.t === "h3") return <h3 key={i}>{text.replace(/\*\*/g, "")}</h3>;
        return <p key={i}>{rich(text)}</p>;
      })}
    </div>
  );
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
