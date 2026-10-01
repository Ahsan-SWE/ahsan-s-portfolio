import Link from "next/link";
import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    const label = match[1];
    const href = match[2];
    if (href.startsWith("/")) {
      parts.push(<Link key={`link-${key++}`} href={href} className="text-link">{label}</Link>);
    } else {
      parts.push(<a key={`link-${key++}`} href={href} target="_blank" rel="noopener noreferrer" className="text-link">{label}</a>);
    }
    cursor = regex.lastIndex;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  return (
    <div className="reading-copy max-w-none">
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) return <h3 key={index}>{renderInline(block.slice(4))}</h3>;
        if (block.startsWith("## ")) return <h2 key={index}>{renderInline(block.slice(3))}</h2>;
        if (block.startsWith("# ")) return <h2 key={index}>{renderInline(block.slice(2))}</h2>;
        if (block.startsWith("- ")) {
          const items = block.split("\n").map((line) => line.replace(/^[-*]\s+/, "")).filter(Boolean);
          return <ul key={index}>{items.map((item) => <li key={item}>{renderInline(item)}</li>)}</ul>;
        }
        return <p key={index}>{renderInline(block.replace(/\n/g, " "))}</p>;
      })}
    </div>
  );
}
