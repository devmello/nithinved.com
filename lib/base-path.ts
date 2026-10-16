// GitHub Pages serves a project site from /<repo-name>/, so files in public/ need that prefix.
// The deploy workflow sets it at build time; it stays empty for local dev and root-hosted sites.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const withBasePath = (path: string) => (path.startsWith('/') ? `${basePath}${path}` : path)
