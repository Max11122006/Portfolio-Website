/**
 * Renders a field that is still awaiting copy as an obvious gap rather than as
 * something that could be mistaken for finished text. Marked with
 * data-copy-gap so it is trivially findable in the DOM and in screenshots.
 */
export default function CopyGap({ text }: { text: string }) {
  return (
    <span
      data-copy-gap=""
      className="font-mono text-[11px] text-muted/70 border-b border-dashed border-muted/40"
    >
      {text}
    </span>
  );
}
