import { Scramble } from './scramble'
import { site } from '@/lib/content'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-24 pb-16 md:pt-40 md:pb-24">
      <h1
        id="hero-title"
        className="max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-6xl"
      >
        <Scramble
          text={[
            { text: site.name },
            { text: ` ${site.heading}`, className: 'block text-muted-foreground' },
          ]}
        />
      </h1>
      <p className="mt-6 font-mono text-xs text-muted-foreground">
        {site.subline} <span className="text-signal">/</span> {site.span}
      </p>
    </section>
  )
}
