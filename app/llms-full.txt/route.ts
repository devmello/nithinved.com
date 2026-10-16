import { llmsFull } from '@/lib/agent-text'

// Written to out/llms-full.txt by the static export.
export const dynamic = 'force-static'

export function GET() {
  return new Response(llmsFull(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
