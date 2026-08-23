import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import type { ComponentProps } from 'react'

/**
 * Renders article markdown with the site's typography.
 *
 * Styling is applied through an explicit component map rather than a prose
 * plugin, so headings and tables match the rest of the site exactly and there
 * is no second type scale to keep in sync.
 *
 * Internal links render through next/link for client navigation; external ones
 * get `rel="noopener noreferrer"` and open in a new tab.
 */
function isInternal(href?: string): boolean {
  return Boolean(href?.startsWith('/'))
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="flex flex-col">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children: c }) => (
            <h2 className="mt-12 text-h2 text-navy first:mt-0">{c}</h2>
          ),
          h3: ({ children: c }) => <h3 className="mt-9 text-h3 text-navy">{c}</h3>,
          p: ({ children: c }) => (
            <p className="mt-5 text-[1.05rem] leading-relaxed text-navy-700">{c}</p>
          ),
          ul: ({ children: c }) => (
            <ul className="mt-5 flex flex-col gap-2.5 pl-1">{c}</ul>
          ),
          ol: ({ children: c }) => (
            <ol className="mt-5 flex list-decimal flex-col gap-2.5 pl-5 marker:font-semibold marker:text-cyan-700">
              {c}
            </ol>
          ),
          li: ({ children: c, ...props }) => {
            // Ordered-list items inherit the native marker; unordered items get
            // a cyan bullet drawn here instead of list-style, so it can be
            // coloured and aligned with the text baseline.
            const ordered = 'node' in props && false
            return ordered ? (
              <li className="text-[1.05rem] leading-relaxed text-navy-700">{c}</li>
            ) : (
              <li className="flex items-start gap-3 text-[1.05rem] leading-relaxed text-navy-700">
                <span
                  aria-hidden="true"
                  className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
                />
                <span className="min-w-0">{c}</span>
              </li>
            )
          },
          strong: ({ children: c }) => (
            <strong className="font-semibold text-navy">{c}</strong>
          ),
          em: ({ children: c }) => <em className="italic">{c}</em>,
          blockquote: ({ children: c }) => (
            <blockquote className="mt-6 border-l-2 border-cyan/50 bg-mist/60 py-1 pl-5 text-[1.05rem] italic text-navy-600">
              {c}
            </blockquote>
          ),
          a: ({ href, children: c }) =>
            isInternal(href) ? (
              <Link
                href={href!}
                className="font-medium text-cyan-700 underline underline-offset-4 hover:text-cyan-600"
              >
                {c}
              </Link>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cyan-700 underline underline-offset-4 hover:text-cyan-600"
              >
                {c}
              </a>
            ),
          // Tables carry cost comparisons, so they must stay readable on a
          // phone — the wrapper scrolls rather than letting the page do it.
          table: ({ children: c }) => (
            <div className="mt-7 overflow-x-auto rounded-xl border border-navy-100">
              <table className="w-full min-w-[30rem] border-collapse text-left text-[0.95rem]">
                {c}
              </table>
            </div>
          ),
          thead: ({ children: c }) => <thead className="bg-mist/70">{c}</thead>,
          th: ({ children: c }) => (
            <th className="border-b border-navy-100 p-4 font-semibold text-navy">{c}</th>
          ),
          td: ({ children: c }) => (
            <td className="border-b border-navy-100 p-4 text-navy-700 tabular-nums last:border-0">
              {c}
            </td>
          ),
          hr: () => <hr className="mt-10 border-navy-100" />,
          code: ({ children: c }: ComponentProps<'code'>) => (
            <code className="rounded bg-mist px-1.5 py-0.5 text-[0.9em] text-navy">{c}</code>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
