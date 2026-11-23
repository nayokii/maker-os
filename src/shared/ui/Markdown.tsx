import ReactMarkdown, { type Components } from 'react-markdown'

// On associe chaque élément Markdown à une balise stylée avec Tailwind.
const components: Components = {
  h1: ({ children }) => <h1 className="mb-4 text-[32px] font-semibold leading-10">{children}</h1>,
  h2: ({ children }) => (
    <h2 className="mb-2 mt-8 text-2xl font-semibold leading-8">{children}</h2>
  ),
  p: ({ children }) => <p className="my-3 max-w-prose">{children}</p>,
  ul: ({ children }) => <ul className="my-3 max-w-prose list-disc space-y-1 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-3 max-w-prose list-decimal space-y-1 pl-6">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  code: ({ children }) => (
    <code className="rounded-sm bg-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-accent">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 max-w-prose rounded-md border border-line-strong bg-surface p-4">
      {children}
    </blockquote>
  ),
}

export function Markdown({ source }: { source: string }) {
  return <ReactMarkdown components={components}>{source}</ReactMarkdown>
}
