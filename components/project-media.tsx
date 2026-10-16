'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { ModelViewer } from './model-viewer'
import { Shot } from './primitives'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

type Video = { src: string; poster: string }

// Square media slot: an interactive CAD model or a demo video when there is one, with a toggle back to the image.
export function ProjectMedia({
  src,
  alt,
  title,
  model,
  video,
  priority,
}: {
  src: string
  alt: string
  title: string
  model?: string
  video?: Video
  priority?: boolean
}) {
  const [view, setView] = useState<'rich' | 'image'>('rich')
  const shot = (
    <Shot src={src} alt={alt} aspect="aspect-square" sizes="(min-width: 768px) 55vw, 100vw" priority={priority} />
  )
  if (!model && !video) return shot

  const views = [
    ['rich', model ? '3D CAD' : 'Demo'],
    ['image', model ? 'Render' : 'Image'],
  ] as const
  const richClass = cn('aspect-square', view !== 'rich' && 'hidden')

  return (
    <div className="relative">
      {/* Kept mounted while hidden so switching back doesn't reload the model or video. */}
      {model ? (
        <ModelViewer src={model} label={`Interactive 3D CAD model of ${title}`} className={richClass} />
      ) : (
        video && <DemoVideo video={video} label={`Demo video of the ${title.toLowerCase()}`} className={richClass} />
      )}
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
            onClick={() => setView(key)}
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

// Muted loop that plays only while on screen, with a pause button. Reduced motion starts it paused.
function DemoVideo({ video, label, className }: { video: Video; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const heldRef = useRef(false) // paused by the viewer, so scrolling back doesn't restart it
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    heldRef.current = matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !heldRef.current) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

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
        src={withBasePath(video.src)}
        poster={withBasePath(video.poster)}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-cover"
      />
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
