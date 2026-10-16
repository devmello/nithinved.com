import { agentPaths } from '@/lib/agent-text'
import { site } from '@/lib/content'

// A route rather than app/robots.ts so it can carry the comment pointing agents at the text versions.
export const dynamic = 'force-static'

export function GET() {
  const body = `User-agent: *
Allow: /

# Machine-readable versions of this site, for AI agents and crawlers:
#   ${site.url}${agentPaths.index}        short index
#   ${site.url}${agentPaths.full}   full text as Markdown
#   ${site.url}${agentPaths.page}              full text as plain HTML
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
