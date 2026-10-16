const links = [
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-5 md:px-8"
      >
        <a href="#top" className="text-sm font-medium tracking-tight">
          Nithin Vedagarbha
        </a>
        <ul className="flex items-center gap-5 text-sm text-muted-foreground md:gap-8">
          {links.map((l, i) => (
            <li key={l.href} className={i === 1 ? 'hidden sm:block' : undefined}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
