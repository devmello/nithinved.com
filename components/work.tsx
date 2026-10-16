'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProjectMedia } from './project-media'
import { Scramble } from './scramble'
import { robots } from '@/lib/content'
import { cn } from '@/lib/utils'

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
              <ProjectMedia
                src={r.src}
                alt={r.alt}
                caption={r.caption}
                model={r.model}
                videos={r.videos}
                youtube={r.youtube}
                title={r.title}
                priority={i === 0}
              />
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
