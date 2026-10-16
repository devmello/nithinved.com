import { Scramble } from './scramble'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-24 pb-16 md:pt-40 md:pb-24">
      <h1
        id="hero-title"
        className="max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight text-balance md:text-6xl"
      >
        <Scramble
          text={[
            { text: 'I design and build robots' },
            { text: ' that survive contact.', className: 'text-muted-foreground' },
          ]}
        />
      </h1>
      <p className="mt-6 font-mono text-xs text-muted-foreground">
        Robotics Engineering, UC Santa Cruz <span className="text-signal">/</span> Selected work
        2023–2026
      </p>
    </section>
  )
}
