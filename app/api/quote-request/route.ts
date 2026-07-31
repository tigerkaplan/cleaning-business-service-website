import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { processQuoteRequest } from '@/lib/quote-request-processing'

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5
const buckets = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(key: string) {
  const now = Date.now()
  const current = buckets.get(key)
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > MAX_REQUESTS
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: 'RATE_LIMITED', message: 'Too many requests. Please wait and try again.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, code: 'INVALID_REQUEST', message: 'We could not read the request. Please check the form and try again.' },
      { status: 400 },
    )
  }

  try {
    const result = await processQuoteRequest(body, async (payload) => {
      const supabase = createSupabaseServerClient()
      const response = await supabase.from('inbound_submissions').insert(payload)
      if (response.error) console.error('Inbound submission insert failed:', response.error)
      return { error: response.error }
    })

    return NextResponse.json(
      result.ok
        ? { ok: true }
        : { ok: false, code: result.code, message: result.message, errors: result.errors },
      { status: result.status },
    )
  } catch (error) {
    console.error('Quote request API error:', error)
    return NextResponse.json(
      { ok: false, code: 'SERVICE_UNAVAILABLE', message: 'The quote request service is temporarily unavailable. Please try again later.' },
      { status: 503 },
    )
  }
}
