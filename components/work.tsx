'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProjectMedia, type Video, type YouTube } from './project-media'
import { Scramble } from './scramble'
import { cn } from '@/lib/utils'

type Robot = {
  src: string
  alt: string
  model?: string
  videos?: Video[]
  youtube?: YouTube
  title: string
  meta: string
  team: string
  note: string
}

const robots: Robot[] = [
  {
    src: '/work/cupid-robot.jpg',
    model: '/models/cupid.glb',
    videos: [{ src: '/work/cupid-demo.mp4', poster: '/work/cupid-demo.jpg' }],
    alt: 'Render of Cupid, with its turret shooter, spindexer and roller intake',
    title: 'Cupid',
    meta: '2025–26',
    team: 'MKII FTC 26216',
    note: '“No misses, just kisses.” A passive spindexer that indexes artifacts for any motif, a gear-train turret with an adjustable hood, and shooting on the move with OpenCV artifact detection.',
  },
  {
    src: '/work/cobra-robot.jpg',
    youtube: { id: 'W_z9L4mETQY', title: 'MTI 2024 · Finals 2' },
    alt: 'Render of the Cobra, with its arm and claw folded over the drivetrain',
    title: 'Cobra',
    meta: '2023–24',
    team: 'Innov8rz FTC 11039',
    note: '“Strike with precision.” Max solo score of 246, with a constant-force-spring drone launcher, a lead-screw hang and a three-joint arm with a smart claw.',
  },
  {
    src: '/work/purple-emperor-robot.jpg',
    videos: [
      { src: '/work/purple-emperor-demo-1.mp4', poster: '/work/purple-emperor-demo-1.jpg' },
      { src: '/work/purple-emperor-demo-2.mp4', poster: '/work/purple-emperor-demo-2.jpg' },
    ],
    alt: 'Render of Purple Emperor, with its linear-slide outtake and arm',
    title: 'Purple Emperor',
    meta: '2024–25',
    team: 'MKII FTC 26216',
    note: '“Fly like a butterfly, sting like a bee.” Max solo score of 242, first qualifier as winning alliance captain and 3rd Inspire, on an aluminum and polycarbonate drivetrain with three odometry pods.',
  },
]

export function Work() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const next = (index + robots.length) % robots.length
    track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(active - 1)
    }
  }

  return (
    <section id="work" aria-roledescription="carousel" aria-label="Robots" className="flex flex-col gap-8">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none [scrollbar-width:none] focus-visible:ring-1 focus-visible:ring-ring [&::-webkit-scrollbar]:hidden"
      >
        {robots.map((r, i) => (
          <article
            key={r.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${robots.length}: ${r.title}`}
            className="grid w-full shrink-0 snap-start items-center gap-8 md:grid-cols-[5fr_6fr] md:gap-16"
          >
            <div className="order-2 flex flex-col gap-4 md:order-1">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, '0')} / {String(robots.length).padStart(2, '0')}
              </span>
              <h2 className="text-balance text-4xl font-medium tracking-tight md:text-6xl">
                <Scramble text={r.title} />
              </h2>
              <p className="font-mono text-xs text-muted-foreground">
                {r.team} · {r.meta}
              </p>
              <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">{r.note}</p>
            </div>
            <div className="order-1 md:order-2">
              <ProjectMedia src={r.src} alt={r.alt} model={r.model} videos={r.videos} youtube={r.youtube} title={r.title} priority={i === 0} />
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Choose robot">
          {robots.map((r, i) => (
            <button
              key={r.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={r.title}
              onClick={() => goTo(i)}
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                active === i ? 'w-8 bg-foreground' : 'w-4 bg-muted-foreground/40 hover:bg-muted-foreground',
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous robot"
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next robot"
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
