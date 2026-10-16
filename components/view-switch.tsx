'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { withBasePath } from '@/lib/base-path'
import { agentPaths } from '@/lib/content'
import { cn } from '@/lib/utils'

type Mode = 'human' | 'llm'

const SWEEP_MS = 560

// Plain text in, text with clickable URLs out.
function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s<>"`)]+)/g).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    const trail = part.match(/[.,;:]+$/)?.[0] ?? ''
    const url = trail ? part.slice(0, -trail.length) : part
    return (
      <Fragment key={i}>
        <a href={url} className="underline decoration-border underline-offset-4 hover:decoration-signal">
          {url}
        </a>
        {trail}
      </Fragment>
    )
  })
}

/**
 * Lets a visitor see the page the way an agent does: "LLM" swaps the page for llms-full.txt, the same
 * Markdown agents get. A scan line sweeps down the screen while the views trade places underneath it.
 */
export function ViewSwitch({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('human')
  const [text, setText] = useState<string | null>(null)
  const humanRef = useRef<HTMLDivElement>(null)
  const llmRef = useRef<HTMLElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)
  const sweepingRef = useRef(false)
  const loadRef = useRef<Promise<void> | null>(null)

  const load = useCallback(() => {
    loadRef.current ??= fetch(withBasePath(agentPaths.full), { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.text()
      })
      .then(setText)
      .catch(() => {
        loadRef.current = null
        setText('llms-full.txt could not be loaded. Open /ai instead.')
      })
    return loadRef.current
  }, [])

  // Above the line the incoming view shows, below it the outgoing one, so the page turns as it passes.
  const sweep = (to: Mode, done: () => void) => {
    const incoming = to === 'llm' ? llmRef.current : humanRef.current
    const outgoing = to === 'llm' ? humanRef.current : llmRef.current
    const scan = scanRef.current
    if (!incoming || !outgoing || !scan) return done()

    sweepingRef.current = true
    window.scrollTo(0, 0)
    incoming.hidden = false
    outgoing.hidden = false
    incoming.style.cssText = 'position:absolute;inset:0 0 auto 0;clip-path:inset(0 0 100% 0)'
    scan.hidden = false

    const reach = window.innerHeight + 48
    const start = performance.now()
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      window.clearTimeout(guard)
      incoming.style.cssText = ''
      outgoing.style.clipPath = ''
      outgoing.hidden = true // before React catches up, so the two views never stack for a frame
      scan.hidden = true
      sweepingRef.current = false
      done()
    }
    // If animation frames stall (background tab, throttled webview), settle anyway.
    const guard = window.setTimeout(finish, SWEEP_MS + 300)
    const frame = (now: number) => {
      if (finished) return
      const p = Math.min(1, (now - start) / SWEEP_MS)
      const y = Math.round((1 - (1 - p) ** 3) * reach)
      incoming.style.clipPath = `inset(0 0 calc(100% - ${y}px) 0)`
      outgoing.style.clipPath = `inset(${y}px 0 0 0)`
      scan.style.transform = `translateY(${y - 2}px)`
      if (p < 1) requestAnimationFrame(frame)
      else finish()
    }
    requestAnimationFrame(frame)
  }

  const choose = (next: Mode, animate: boolean) => {
    if (sweepingRef.current || next === mode) return
    const settle = () => {
      setMode(next)
      if (!animate) return
      try {
        history.replaceState(null, '', next === 'llm' ? '?view=llm' : location.pathname)
      } catch {
        // file: URLs
      }
      window.scrollTo(0, 0)
    }
    if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (next === 'llm') load()
      return settle()
    }
    const go = () => sweep(next, settle)
    if (next === 'llm') load().then(go, go)
    else go()
  }

  useEffect(() => {
    if (/[?&]view=llm(&|$)/.test(location.search)) {
      load()
      setMode('llm')
    }
  }, [load])

  const llm = mode === 'llm'

  return (
    <div className="relative">
      <div ref={humanRef} hidden={llm}>
        {children}
      </div>

      <section ref={llmRef} hidden={!llm} aria-label="Plain-text version, as AI agents read it">
        <div className="mx-auto max-w-7xl px-5 pt-16 pb-32 md:px-8">
          <pre
            tabIndex={0}
            className="max-w-[84ch] font-mono text-[13px] leading-relaxed break-words whitespace-pre-wrap text-foreground outline-none"
          >
            {text === null ? 'Loading llms-full.txt…' : linkify(text)}
          </pre>
        </div>
      </section>

      <div
        ref={scanRef}
        hidden
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-0.5 bg-signal before:absolute before:inset-x-0 before:bottom-full before:h-7 before:bg-linear-to-t before:from-signal/25 before:to-transparent"
      />

      <div
        role="group"
        aria-label="View this site as"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 rounded-full border border-border bg-background/80 p-1 font-mono text-xs shadow-lg backdrop-blur-md"
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-foreground transition-transform duration-300 motion-reduce:transition-none',
            llm && 'translate-x-full',
          )}
        />
        {(
          [
            ['human', 'Human', withBasePath('/')],
            ['llm', 'LLM', withBasePath(agentPaths.page)],
          ] as const
        ).map(([key, label, href]) => (
          <a
            key={key}
            href={href}
            aria-current={mode === key ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault()
              choose(key, true)
            }}
            className={cn(
              'relative z-10 flex min-w-20 items-center justify-center rounded-full px-4 py-2 transition-colors',
              mode === key ? 'text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
