import { agentPaths } from '@/lib/agent-text'
import { withBasePath } from '@/lib/base-path'
import { contact } from '@/lib/content'

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="pt-32 pb-12 md:pt-48">
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>
      <p className="text-sm text-muted-foreground">{contact.intro}</p>
      <a
        href={`mailto:${contact.email}`}
        className="mt-3 inline-block text-4xl font-medium tracking-tight underline decoration-border decoration-1 underline-offset-8 transition-colors hover:decoration-signal md:text-6xl"
      >
        Say hello
      </a>
      <p className="mt-6">
        <a
          href={`mailto:${contact.email}`}
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {contact.email}
        </a>
      </p>
      <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="font-mono text-xs">© 2026 Nithin Vedagarbha</span>
        <ul className="flex gap-6">
          {contact.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        Plain text for agents at{' '}
        <a href={withBasePath(agentPaths.page)} className="underline decoration-border underline-offset-4 hover:text-foreground">
          /ai
        </a>
        , with{' '}
        <a href={withBasePath(agentPaths.index)} className="underline decoration-border underline-offset-4 hover:text-foreground">
          llms.txt
        </a>{' '}
        and{' '}
        <a href={withBasePath(agentPaths.full)} className="underline decoration-border underline-offset-4 hover:text-foreground">
          llms-full.txt
        </a>
        .
      </p>
    </footer>
  )
}
