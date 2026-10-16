/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export to out/, for GitHub Pages.
  output: 'export',
  // "/<repo-name>" when deployed as a GitHub Pages project site (set by the deploy workflow).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
