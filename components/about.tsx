import { Label } from './primitives'

const timeline = [
  ['Fall 2026', 'Formula Slug', 'Powertrain'],
  ['2025–26', 'MKII FTC 26216', 'Team Captain'],
  ['2021–24', 'Innov8rz FTC 11039', 'Head of Mechanical'],
  ['2022–23', 'ICC Lego Robotics', 'Head Counselor'],
] as const

const recognition = [
  'First-pick alliance, FIRST World Championship',
  '14th all-time, FTC Hall of Fame',
  '2× FIRST Dean’s List Semi-Finalist',
  '2× Gold President’s Volunteer Service Award',
  'Mentored teams in Kenya, Jamaica, and India',
]

const tools = ['Fusion 360', 'CNC', 'Laser cutting', 'Bambu P1S', 'Prusa MK4', 'Arduino', 'OpenCV', 'goBILDA']

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="pt-32 md:pt-48">
      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
        <div className="flex flex-col gap-8">
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <p className="max-w-xl text-2xl leading-snug font-medium tracking-tight text-balance md:text-3xl">
            CAD, fabricate, test, break, repeat.{' '}
            <span className="text-muted-foreground">
              I like tightly packaged hardware that stays serviceable under competition pressure.
            </span>
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Label>Timeline</Label>
            <ol className="flex flex-col">
              {timeline.map(([when, org, role]) => (
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
              {recognition.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
