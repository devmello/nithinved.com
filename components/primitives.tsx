import Image from 'next/image'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

export function Shot({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  sizes = '(min-width: 768px) 50vw, 100vw',
  priority,
  className,
}: {
  src: string
  alt: string
  aspect?: string
  sizes?: string
  priority?: boolean
  className?: string
}) {
  return (
    <div className={cn('relative w-full overflow-hidden rounded-sm bg-card', aspect, className)}>
      <Image
        src={withBasePath(src)}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </div>
  )
}

export function Caption({
  title,
  meta,
  note,
  as: Tag = 'h3',
}: {
  title: string
  meta?: string
  note?: string
  as?: 'h2' | 'h3' | 'p'
}) {
  return (
    <div className="flex flex-col gap-1 pt-4">
      <div className="flex items-baseline justify-between gap-4">
        <Tag className="text-lg font-medium tracking-tight">{title}</Tag>
        {meta && <span className="shrink-0 font-mono text-xs text-muted-foreground">{meta}</span>}
      </div>
      {note && <p className="text-sm text-muted-foreground">{note}</p>}
    </div>
  )
}

export function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs text-muted-foreground">{children}</p>
}
