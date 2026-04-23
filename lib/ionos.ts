// Server-side IONOS API client. Never import from a client component —
// that would leak the secret.

const BASE = 'https://api.hosting.ionos.com'
const REQUEST_TIMEOUT_MS = 10_000

// Allowed API path prefixes — reject anything outside this whitelist.
const ALLOWED_PATHS = ['/dns/v1/', '/domains/v1/']

function apiKey(): string {
  const prefix = process.env.IONOS_API_PREFIX
  const secret = process.env.IONOS_API_SECRET
  if (!prefix || !secret) {
    throw new Error('IONOS_API_PREFIX and IONOS_API_SECRET must be set in .env')
  }
  return `${prefix}.${secret}`
}

function validatePath(path: string): void {
  // Prevent path traversal and restrict to known endpoints.
  const normalized = decodeURIComponent(path).replace(/\/+/g, '/')
  if (normalized.includes('..') || normalized.includes('\\')) {
    throw new Error('Invalid API path')
  }
  if (!ALLOWED_PATHS.some(p => normalized.startsWith(p))) {
    throw new Error(`Disallowed API path: ${normalized}`)
  }
}

export async function ionosFetch(path: string, init?: RequestInit): Promise<Response> {
  validatePath(path)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(`${BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        'X-API-Key': apiKey(),
        Accept: 'application/json',
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    })
  } finally {
    clearTimeout(timeout)
  }
}

export interface IonosError {
  ok: false
  status: number
  message: string
}

export interface IonosSuccess<T> {
  ok: true
  status: number
  data: T
}

export type IonosResult<T> = IonosSuccess<T> | IonosError

export async function ionosJson<T>(path: string): Promise<IonosResult<T>> {
  try {
    const res = await ionosFetch(path)
    const text = await res.text()
    let parsed: unknown = null
    try { parsed = text ? JSON.parse(text) : null } catch { /* non-JSON body */ }

    if (!res.ok) {
      const msg =
        parsed && typeof parsed === 'object' && 'message' in parsed
          ? String((parsed as { message: unknown }).message)
          : res.statusText || 'Request failed'
      return { ok: false, status: res.status, message: msg }
    }
    return { ok: true, status: res.status, data: parsed as T }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return { ok: false, status: 0, message: 'Request timed out' }
    }
    return {
      ok: false,
      status: 0,
      message: err instanceof Error ? err.message : 'Network error',
    }
  }
}
