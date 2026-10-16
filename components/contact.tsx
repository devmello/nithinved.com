import { contactLinks } from '@/lib/links'

const links = [
  { label: 'LinkedIn', href: contactLinks.linkedin },
  { label: 'GitHub', href: contactLinks.github },
]

export function Contact() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="pt-32 pb-12 md:pt-48">
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>
      <p className="text-sm text-muted-foreground">Robotics, aerospace, high-rate hardware.</p>
      <a
        href={`mailto:${contactLinks.email}`}
        className="mt-3 inline-block text-4xl font-medium tracking-tight underline decoration-border decoration-1 underline-offset-8 transition-colors hover:decoration-signal md:text-6xl"
      >
        Say hello
      </a>
      <p className="mt-6">
        <a
          href={`mailto:${contactLinks.email}`}
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {contactLinks.email}
        </a>
      </p>
      <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="font-mono text-xs">© 2026 Nithin Vedagarbha</span>
        <ul className="flex gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
