import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { withBasePath } from '@/lib/base-path'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Nithin Vedagarbha — Robotics Engineering',
  description:
    'Mechanism design, system architecture, and competition robotics by Nithin Vedagarbha, Robotics Engineering at UC Santa Cruz.',
  generator: 'v0.app',
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
        {children}
        {/* Vercel Analytics only works on Vercel; elsewhere (e.g. GitHub Pages) its script would 404. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
