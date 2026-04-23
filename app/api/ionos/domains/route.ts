import { NextResponse } from 'next/server'
import { ionosJson } from '@/lib/ionos'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface DomainsResponse {
  domains?: unknown[]
  _embedded?: { domains?: unknown[] }
  [key: string]: unknown
}

export async function GET() {
  const result = await ionosJson<DomainsResponse>('/domains/v1/domainitems')
  if (!result.ok) {
    return NextResponse.json(
      { error: result.message, status: result.status },
      { status: result.status || 502 },
    )
  }

  // IONOS sometimes wraps lists in _embedded — normalize to a flat array.
  const raw = result.data
  const domains = Array.isArray(raw)
    ? raw
    : (raw?._embedded?.domains ?? raw?.domains ?? [])

  return NextResponse.json({ domains })
}
