const required = [
  'WEBSITE_INTAKE_MODE',
  'NEXT_PUBLIC_BUSINESS_NAME',
  'NEXT_PUBLIC_BUSINESS_EMAIL',
  'NEXT_PUBLIC_BUSINESS_PHONE',
]

const mode=String(process.env.WEBSITE_INTAKE_MODE||'').trim().toUpperCase()
if(mode==='TEST') required.push('SUPABASE_TEST_URL','SUPABASE_TEST_SECRET_KEY')
else if(mode==='PRODUCTION') required.push('WEBSITE_INTAKE_PRODUCTION_APPROVED','SUPABASE_PRODUCTION_URL','SUPABASE_PRODUCTION_SECRET_KEY')
else required.push('SUPABASE_TEST_URL','SUPABASE_TEST_SECRET_KEY')

const missing = required.filter((key) => !process.env[key] || process.env[key].includes('your-') || process.env[key].includes('0000'))

if (missing.length) {
  console.error('Milestone 1 env check failed. Missing or placeholder values:')
  for (const key of missing) console.error(`- ${key}`)
  process.exit(1)
}

if(mode==='PRODUCTION'&&process.env.WEBSITE_INTAKE_PRODUCTION_APPROVED!=='true'){
  console.error('Milestone 1 env check failed. Production Website intake is not explicitly approved.')
  process.exit(1)
}

console.log('Milestone 1 env check passed.')
