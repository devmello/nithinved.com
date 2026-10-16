import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { agentPaths, personJsonLd } from '@/lib/agent-text'
import { withBasePath } from '@/lib/base-path'
import { site } from '@/lib/content'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  generator: 'v0.app',
  // Point agents at the text versions of the page (see lib/agent-text.ts).
  alternates: {
    types: {
      'text/markdown': [{ url: withBasePath(agentPaths.full), title: 'This page as Markdown, for AI agents' }],
      'text/plain': [{ url: withBasePath(agentPaths.index), title: 'llms.txt' }],
    },
  },
  icons: {
    icon: [
      { url: withBasePath('/icon-light-32x32.png'), media: '(prefers-color-scheme: light)' },
      { url: withBasePath('/icon-dark-32x32.png'), media: '(prefers-color-scheme: dark)' },
      { url: withBasePath('/icon.svg'), type: 'image/svg+xml' },
    ],
    apple: withBasePath('/apple-icon.png'),
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#16171a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // JSON-LD has to be inline; the data is ours, built at compile time.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        {/* Vercel Analytics only works on Vercel; elsewhere (e.g. GitHub Pages) its script would 404. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
