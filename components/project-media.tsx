'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { ModelViewer } from './model-viewer'
import { Shot } from './primitives'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

export type Video = { src: string; poster: string }
type View = 'demo' | 'cad' | 'image'

// Square media slot: demo video(s), then an interactive CAD model, then the image — whichever exist,
// with a toggle between them. Each heavy view mounts the first time it's shown, then stays mounted.
export function ProjectMedia({
  src,
  alt,
  title,
  model,
  videos,
  imageLabel = 'Render',
  priority,
}: {
  src: string
  alt: string
  title: string
  model?: string
  videos?: Video[]
  imageLabel?: string
  priority?: boolean
}) {
  const views = [
    videos?.length ? (['demo', 'Demo'] as const) : null,
    model ? (['cad', '3D CAD'] as const) : null,
    ['image', imageLabel] as const,
  ].filter((v) => v !== null)
  const [view, setView] = useState<View>(views[0][0])
  const [opened, setOpened] = useState<Set<View>>(() => new Set([views[0][0]]))

  const shot = (
    <Shot
      src={src}
      alt={alt}
      aspect="aspect-square"
      sizes="(min-width: 768px) 55vw, 100vw"
      priority={priority && view === 'image'}
    />
  )
  if (views.length === 1) return shot

  const show = (next: View) => {
    setView(next)
    setOpened((prev) => (prev.has(next) ? prev : new Set(prev).add(next)))
  }
  const slot = (key: View) => cn('aspect-square', view !== key && 'hidden')

  return (
    <div className="relative">
      {videos?.length && opened.has('demo') ? (
        <DemoVideo videos={videos} label={`Demo video of ${title}`} className={slot('demo')} />
      ) : null}
      {model && opened.has('cad') ? (
        <ModelViewer src={model} label={`Interactive 3D CAD model of ${title}`} className={slot('cad')} />
      ) : null}
      {view === 'image' && shot}
      <div
        role="group"
        aria-label="Media"
        className="absolute top-3 right-3 flex rounded-full border border-border bg-background/70 p-0.5 font-mono text-xs backdrop-blur-md"
      >
        {views.map(([key, text]) => (
          <button
            key={key}
            type="button"
            aria-pressed={view === key}
            onClick={() => show(key)}
            className={cn(
              'rounded-full px-3 py-1.5 transition-colors',
              view === key ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}

// Muted clips played back to back (looping), only while on screen, with a pause button.
// Nothing downloads until the slot scrolls into view. Reduced motion starts it paused.
function DemoVideo({ videos, label, className }: { videos: Video[]; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const heldRef = useRef(false) // paused by the viewer, so scrolling back doesn't restart it
  const visibleRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const clip = videos[index]

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    heldRef.current = matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && !heldRef.current) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  // Keep playing across a clip change.
  useEffect(() => {
    const v = ref.current
    if (v && index > 0 && visibleRef.current && !heldRef.current) v.play().catch(() => {})
  }, [index])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    heldRef.current = !v.paused
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <div className={cn('relative w-full overflow-hidden rounded-sm bg-card', className)}>
      <video
        ref={ref}
        src={withBasePath(clip.src)}
        poster={withBasePath(clip.poster)}
        aria-label={label}
        muted
        loop={videos.length === 1}
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setIndex((i) => (i + 1) % videos.length)}
        className="absolute inset-0 size-full object-cover"
      />
      {videos.length > 1 && (
        <p className="pointer-events-none absolute bottom-5 left-4 font-mono text-xs text-foreground/80 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
        </p>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
      >
        {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
      </button>
    </div>
  )
}
