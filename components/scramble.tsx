'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type Segment = { text: string; className?: string }

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const SYMBOLS = '#*+=<>[]{}~'
const CHARS_PER_SECOND = 40 // reveal sweep speed, left to right
const TICK_MS = 34 // how often the unresolved glyphs re-randomise

const pick = (set: string) => set.charAt(Math.floor(Math.random() * set.length))

// Swap in a glyph of similar width so lines don't reflow mid-sweep.
function garble(c: string) {
  if (c === ' ') return c
  if (Math.random() < 0.2) return pick(SYMBOLS)
  return pick(c !== c.toUpperCase() ? LOWER : UPPER)
}

/**
 * Text that decodes from random glyphs as it scrolls into view, and scrambles again
 * when it leaves so it replays either direction. The real text stays in the layout
 * (and the accessibility tree) underneath; the animated copy is an aria-hidden overlay.
 */
export function Scramble({ text, className }: { text: string | Segment[]; className?: string }) {
  const segments = typeof text === 'string' ? [{ text }] : text
  const rootRef = useRef<HTMLSpanElement>(null)
  const outRef = useRef<HTMLSpanElement>(null)
  const content = segments.map((s) => s.text).join('\u0000')

  useEffect(() => {
    const root = rootRef.current
    const out = outRef.current
    if (!root || !out || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const parts = content.split('\u0000')
    const spans = Array.from(out.children) as HTMLElement[]
    const total = parts.reduce((n, p) => n + p.length, 0)
    let raf = 0

    const render = (resolved: number) => {
      let at = 0
      parts.forEach((p, i) => {
        let s = ''
        for (let j = 0; j < p.length; j++, at++) s += at < resolved ? p[j] : garble(p[j])
        spans[i].textContent = s
      })
    }

    const scramble = () => {
      cancelAnimationFrame(raf)
      root.dataset.scrambling = ''
      render(0)
    }

    const reveal = () => {
      cancelAnimationFrame(raf)
      root.dataset.scrambling = ''
      const duration = Math.min(1150, Math.max(500, (total / CHARS_PER_SECOND) * 1000))
      const start = performance.now()
      let last = -Infinity
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        if (now - last >= TICK_MS || p === 1) {
          render(Math.floor(p * total))
          last = now
        }
        if (p < 1) raf = requestAnimationFrame(tick)
        else delete root.dataset.scrambling
      }
      raf = requestAnimationFrame(tick)
    }

    scramble() // start garbled so nothing flashes before the sweep
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? reveal() : scramble()), {
      rootMargin: '0px 0px -8% 0px',
    })
    io.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      delete root.dataset.scrambling
    }
  }, [content])

  return (
    <span ref={rootRef} className={cn('group/scramble relative block', className)}>
      <span className="group-data-scrambling/scramble:opacity-0">
        {segments.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}
          </span>
        ))}
      </span>
      <span
        ref={outRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-0 select-none group-data-scrambling/scramble:visible"
      >
        {/* Filled in by the effect, so the title isn't duplicated in the server-rendered text. */}
        {segments.map((s, i) => (
          <span key={i} className={s.className} />
        ))}
      </span>
    </span>
  )
}
