import { createClient } from '@supabase/supabase-js'

type WebsiteIntakeMode = 'TEST' | 'PRODUCTION'

export function resolveSupabaseServerConfiguration(environment: NodeJS.ProcessEnv = process.env) {
  const mode = String(environment.WEBSITE_INTAKE_MODE || '').trim().toUpperCase() as WebsiteIntakeMode
  if (!['TEST', 'PRODUCTION'].includes(mode)) {
    throw new Error('Website intake mode must be explicitly configured as TEST or PRODUCTION.')
  }

  if (mode === 'PRODUCTION' && environment.WEBSITE_INTAKE_PRODUCTION_APPROVED !== 'true') {
    throw new Error('Production Website intake is not explicitly approved.')
  }

  const rawUrl = mode === 'TEST' ? environment.SUPABASE_TEST_URL : environment.SUPABASE_PRODUCTION_URL
  const secretKey = mode === 'TEST' ? environment.SUPABASE_TEST_SECRET_KEY : environment.SUPABASE_PRODUCTION_SECRET_KEY
  let url: URL
  try {
    url = new URL(String(rawUrl || ''))
  } catch {
    throw new Error(`${mode} Website intake Supabase URL is missing or invalid.`)
  }

  if (
    url.protocol !== 'https:' ||
    !/^[a-z0-9-]+\.supabase\.co$/i.test(url.hostname) ||
    url.pathname !== '/' || url.search || url.hash || url.username || url.password
  ) {
    throw new Error(`${mode} Website intake Supabase URL is missing or invalid.`)
  }
  if (!secretKey?.trim()) throw new Error(`${mode} Website intake Supabase secret key is missing.`)

  return { mode, url: url.origin, secretKey: secretKey.trim(), projectRef: url.hostname.slice(0, -'.supabase.co'.length).toLowerCase() }
}

export function createSupabaseServerClient() {
  const configuration = resolveSupabaseServerConfiguration()

  return createClient(configuration.url, configuration.secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
