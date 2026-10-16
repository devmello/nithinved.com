import { llmsIndex } from '@/lib/agent-text'

// Written to out/llms.txt by the static export.
export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsIndex(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
