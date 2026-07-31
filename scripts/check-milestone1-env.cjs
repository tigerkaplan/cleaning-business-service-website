const required = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_BUSINESS_NAME',
  'NEXT_PUBLIC_BUSINESS_EMAIL',
  'NEXT_PUBLIC_BUSINESS_PHONE',
]

const missing = required.filter((key) => !process.env[key] || process.env[key].includes('your-') || process.env[key].includes('0000'))

if (missing.length) {
  console.error('Milestone 1 env check failed. Missing or placeholder values:')
  for (const key of missing) console.error(`- ${key}`)
  process.exit(1)
}

console.log('Milestone 1 env check passed.')
