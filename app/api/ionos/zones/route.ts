import { NextResponse } from 'next/server'
import { ionosJson } from '@/lib/ionos'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// IONOS DNS API returns: [{ id, name, type }, ...]
interface Zone {
  id: string
  name: string
  type: string
}

export async function GET() {
  const result = await ionosJson<Zone[]>('/dns/v1/zones')
  if (!result.ok) {
    return NextResponse.json(
      { error: result.message, status: result.status },
      { status: result.status || 502 },
    )
  }
  return NextResponse.json({ zones: result.data ?? [] })
}
