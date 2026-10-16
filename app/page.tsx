import { Hero } from '@/components/hero'
import { Work } from '@/components/work'
import { Projects } from '@/components/projects'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { ViewSwitch } from '@/components/view-switch'

export default function Page() {
  return (
    <ViewSwitch>
      <main className="mx-auto max-w-7xl px-5 md:px-8">
        <Hero />
        <Work />
        <Projects />
        <About />
        <Contact />
      </main>
    </ViewSwitch>
  )
}
