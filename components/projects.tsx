import { ProjectMedia } from './project-media'
import { Label } from './primitives'
import { Scramble } from './scramble'

const projects = [
  {
    src: '/work/cube-rotator.jpg',
    alt: 'The 4×4 cube solver’s purple 3D-printed rotator, with three stepper motors on top',
    caption: 'The 3D-printed rotator, with three stepper motors on top.',
    model: { src: '/models/rotator.glb', caption: 'CAD of the full rotator assembly.' },
    videos: [
      {
        src: '/work/cube-demo.mp4',
        poster: '/work/cube-demo.jpg',
        caption: 'Bench test: the rotator turning a 4×4 cube’s layers.',
      },
    ],
    photos: [
      {
        src: '/work/cube-rotator-gears.jpg',
        alt: 'Underside of the rotator: five gears driving the ring that holds the cube',
        caption: 'Underside: five gears drive the ring that holds the cube.',
      },
      {
        src: '/work/cube-rotator-bench.jpg',
        alt: 'The purple 3D-printed rotator on a table, with a cube and a screwdriver nearby',
        caption: 'The rotator mid-build on a table.',
      },
    ],
    imageLabel: 'Photos',
    title: '4×4 cube solver',
    meta: 'In progress',
    note: 'Going after the robotic 4×4 world record.',
  },
  {
    src: '/work/helmet-sensor.jpg',
    alt: 'Inside of a Riddell SpeedFlex football helmet after the impact sensor is fitted',
    caption: 'After the sensor is fitted inside the helmet.',
    videos: [
      {
        src: '/work/helmet-drill.mp4',
        poster: '/work/helmet-drill.jpg',
        caption: 'Agility drill while wearing the instrumented helmet.',
      },
      {
        src: '/work/helmet-demo.mp4',
        poster: '/work/helmet-demo.jpg',
        caption: 'Sled test: a player drives into the blocking sled while a laptop logs the impacts.',
      },
      {
        src: '/work/helmet-parts.mp4',
        poster: '/work/helmet-parts.jpg',
        caption: 'The electronics, sped up 2.5×: 3D-printed sensor housings, the wiring and the Nano ESP32.',
      },
    ],
    imageLabel: 'Photo',
    title: 'Instrumented helmet',
    meta: 'Field tested',
    note: 'Impact sensing on a Nano ESP32. Four years with youth and high-school teams.',
  },
]

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
