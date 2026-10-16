import { Label } from './primitives'
import { about } from '@/lib/content'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="pt-32 md:pt-48">
      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <div className="flex flex-col gap-8">
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <p className="max-w-xl text-2xl leading-snug font-medium tracking-tight text-balance md:text-3xl">
            {about.lead}{' '}
            <span className="text-muted-foreground">{about.rest}</span>
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
            {about.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Label>Timeline</Label>
            <ol className="flex flex-col">
              {about.timeline.map(([when, org, role]) => (
                <li key={org} className="grid grid-cols-[5.5rem_1fr_auto] gap-4 border-t py-3 text-sm">
                  <span className="font-mono text-xs leading-5 text-muted-foreground">{when}</span>
                  <span>{org}</span>
                  <span className="text-muted-foreground">{role}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-4">
            <Label>Recognition</Label>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              {about.recognition.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
