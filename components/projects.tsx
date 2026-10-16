import { ProjectMedia } from './project-media'
import { Label } from './primitives'
import { Scramble } from './scramble'
import { projects } from '@/lib/content'

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-32 md:pt-48">
      <div className="mb-12 flex items-baseline justify-between md:mb-16">
        <h2 id="projects-title" className="text-2xl font-medium tracking-tight">
          <Scramble text="Projects" />
        </h2>
        <Label>Beyond competition</Label>
      </div>
      <div className="flex flex-col gap-24 md:gap-32">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="grid items-center gap-8 md:grid-cols-[5fr_6fr] md:gap-16"
          >
            <div className="order-2 flex flex-col gap-4 md:order-1">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <h3 className="text-balance text-4xl font-medium tracking-tight md:text-6xl">
                <Scramble text={p.title} />
              </h3>
              <p className="font-mono text-xs text-muted-foreground">{p.meta}</p>
              <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">{p.note}</p>
            </div>
            <div className="order-1 md:order-2">
              <ProjectMedia
                src={p.src}
                alt={p.alt}
                caption={p.caption}
                model={p.model}
                videos={p.videos}
                photos={p.photos}
                imageLabel={p.imageLabel}
                title={p.title}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
