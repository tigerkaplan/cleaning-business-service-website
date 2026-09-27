const assert = require('node:assert/strict')
const fs = require('node:fs')
const Module = require('node:module')
const path = require('node:path')
const test = require('node:test')
const ts = require('typescript')

const root = process.cwd()
const validationSource = fs.readFileSync(path.join(root, 'lib/inbound-submission-validation.ts'), 'utf8')
const typeSource = fs.readFileSync(path.join(root, 'types/inbound-submission.ts'), 'utf8')
const formSource = fs.readFileSync(path.join(root, 'components/QuoteForm.tsx'), 'utf8')
const schemaSource = fs.readFileSync(path.join(root, 'supabase/inbound_submissions.sql'), 'utf8')
const apiSource = fs.readFileSync(path.join(root, 'app/api/quote-request/route.ts'), 'utf8')
const processingSource = fs.readFileSync(path.join(root, 'lib/quote-request-processing.ts'), 'utf8')
const supabaseServerSource = fs.readFileSync(path.join(root, 'lib/supabase-server.ts'), 'utf8')

function loadTypeScriptModule(filePath) {
  const previousLoader = Module._extensions['.ts']
  Module._extensions['.ts'] = (loaded, filename) => {
    const source = fs.readFileSync(filename, 'utf8')
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText
    loaded._compile(compiled, filename)
  }
  try {
    return require(filePath)
  } finally {
    if (previousLoader) Module._extensions['.ts'] = previousLoader
    else delete Module._extensions['.ts']
  }
}

const { validateQuoteRequest: validate, QUOTE_REQUEST_LIMITS } = loadTypeScriptModule(
  path.join(root, 'lib/inbound-submission-validation.ts'),
)
const { processQuoteRequest } = loadTypeScriptModule(path.join(root, 'lib/quote-request-processing.ts'))
const {
  getWebsiteIntakeRuntimeDiagnostic,
  resolveSupabaseServerConfiguration,
} = loadTypeScriptModule(path.join(root, 'lib/supabase-server.ts'))

const validPayload = {
  name: 'Casey Example',
  phone: '07700 900123',
  email: 'casey@example.test',
  service_type: 'Domestic',
  postcode: 'BN1 1AA',
  urgency: 'Medium',
  consent: true,
}

test('honeypot rejects bot submissions', () => {
  const result = validate({ ...validPayload, website: 'spam' })
  assert.equal(result.ok, false)
  assert.equal(result.errors.website, 'Spam protection failed.')
})

test('invalid urgency and service type are rejected', () => {
  const result = validate({ ...validPayload, service_type: 'Bad', urgency: 'Urgent' })
  assert.equal(result.ok, false)
  assert.equal(result.errors.service_type, 'Select a service.')
  assert.equal(result.errors.urgency, 'Select a valid urgency.')
})

test('bedrooms and bathrooms are numeric for Supabase integer columns', () => {
  const result = validate({ ...validPayload, bedrooms: '2', bathrooms: '1' })
  assert.equal(result.ok, true)
  assert.equal(result.payload.bedrooms, 2)
  assert.equal(result.payload.bathrooms, 1)

  const bad = validate({ ...validPayload, bedrooms: '3 bedrooms', bathrooms: '1 bathroom' })
  assert.equal(bad.ok, false)
  assert.equal(bad.errors.bedrooms, 'Bedrooms must be a whole number.')
  assert.equal(bad.errors.bathrooms, 'Bathrooms must be a whole number.')
})

test('photo_url is stored when provided and sets photos to Received', () => {
  const result = validate({ ...validPayload, photo_url: 'https://example.test/photos' })
  assert.equal(result.ok, true)
  assert.equal(result.payload.customer_photos, 'Received')
  assert.deepEqual(result.payload.raw_message, { photo_url: 'https://example.test/photos' })

  const withoutPhoto = validate(validPayload)
  assert.equal(withoutPhoto.ok, true)
  assert.equal(withoutPhoto.payload.customer_photos, 'Requested')
  assert.deepEqual(withoutPhoto.payload.raw_message, {})
})

test('preferred date and photo metadata match the Local App contract', () => {
  const accepted = validate({ ...validPayload, preferred_date: '2026-10-02', photo_url: 'https://example.test/photos' })
  assert.equal(accepted.ok, true)
  assert.equal(accepted.payload.preferred_date, '2026-10-02')
  assert.deepEqual(accepted.payload.raw_message, { photo_url: 'https://example.test/photos' })
  assert.deepEqual(Object.keys(accepted.payload.raw_message), ['photo_url'])

  const invalidDate = validate({ ...validPayload, preferred_date: '02/10/2026' })
  assert.equal(invalidDate.ok, false)
  assert.match(invalidDate.errors.preferred_date, /valid date/)

  const invalidPhoto = validate({ ...validPayload, photo_url: 'javascript:alert(1)' })
  assert.equal(invalidPhoto.ok, false)
  assert.match(invalidPhoto.errors.photo_url, /HTTP or HTTPS/)
})

test('Website Supabase configuration separates TEST and PRODUCTION and fails closed', () => {
  assert.throws(() => resolveSupabaseServerConfiguration({}), /explicitly configured/)
  assert.throws(() => resolveSupabaseServerConfiguration({
    WEBSITE_INTAKE_MODE:'PRODUCTION',
    SUPABASE_PRODUCTION_URL:'https://production-example.supabase.co',
    SUPABASE_PRODUCTION_SECRET_KEY:'secret',
  }), /not explicitly approved/)

  const testConfig = resolveSupabaseServerConfiguration({
    WEBSITE_INTAKE_MODE:'TEST',
    SUPABASE_TEST_URL:'https://test-example.supabase.co',
    SUPABASE_TEST_SECRET_KEY:'test-secret',
    SUPABASE_PRODUCTION_URL:'https://wrong-production.supabase.co',
    SUPABASE_PRODUCTION_SECRET_KEY:'wrong-production-secret',
  })
  assert.deepEqual({mode:testConfig.mode,projectRef:testConfig.projectRef,url:testConfig.url}, {mode:'TEST',projectRef:'test-example',url:'https://test-example.supabase.co'})

  const productionConfig = resolveSupabaseServerConfiguration({
    WEBSITE_INTAKE_MODE:'PRODUCTION',
    WEBSITE_INTAKE_PRODUCTION_APPROVED:'true',
    SUPABASE_PRODUCTION_URL:'https://production-example.supabase.co',
    SUPABASE_PRODUCTION_SECRET_KEY:'production-secret',
    SUPABASE_TEST_URL:'https://wrong-test.supabase.co',
    SUPABASE_TEST_SECRET_KEY:'wrong-test-secret',
  })
  assert.deepEqual({mode:productionConfig.mode,projectRef:productionConfig.projectRef,url:productionConfig.url}, {mode:'PRODUCTION',projectRef:'production-example',url:'https://production-example.supabase.co'})
  assert.doesNotMatch(supabaseServerSource, /NEXT_PUBLIC_SUPABASE|SUPABASE_SERVICE_ROLE_KEY/)
})

test('Website runtime diagnostic reports presence without exposing Supabase values', () => {
  const diagnostic = getWebsiteIntakeRuntimeDiagnostic({
    WEBSITE_INTAKE_MODE: 'PRODUCTION',
    WEBSITE_INTAKE_PRODUCTION_APPROVED: 'true',
    SUPABASE_PRODUCTION_URL: 'https://production-example.supabase.co',
    SUPABASE_PRODUCTION_SECRET_KEY: 'never-log-this-secret',
  })

  assert.deepEqual(diagnostic, {
    mode: 'PRODUCTION',
    approved: 'true',
    hasProductionUrl: true,
    hasProductionSecret: true,
  })
  assert.doesNotMatch(JSON.stringify(diagnostic), /production-example|never-log-this-secret/)
  assert.match(apiSource, /getWebsiteIntakeRuntimeDiagnostic\(\)/)
})

test('required fields, email, phone, UK postcode, consent and normalisation use the real validator', () => {
  const missing = validate({})
  assert.equal(missing.ok, false)
  for (const key of ['name', 'phone', 'email', 'service_type', 'postcode', 'consent']) {
    assert.equal(typeof missing.errors[key], 'string')
  }

  const invalid = validate({
    ...validPayload,
    phone: 'call me',
    email: 'not-an-email',
    postcode: 'not a postcode',
    consent: false,
  })
  assert.equal(invalid.ok, false)
  assert.match(invalid.errors.phone, /valid phone/)
  assert.match(invalid.errors.email, /valid email/)
  assert.match(invalid.errors.postcode, /valid UK postcode/)
  assert.match(invalid.errors.consent, /Confirm/)

  const normalised = validate({
    ...validPayload,
    name: '  Casey Example  ',
    email: '  CASEY@EXAMPLE.TEST ',
    postcode: ' bn1 1aa ',
    message: '  Fictional cleaning request.  ',
  })
  assert.equal(normalised.ok, true)
  assert.equal(normalised.payload.name, 'Casey Example')
  assert.equal(normalised.payload.email, 'casey@example.test')
  assert.equal(normalised.payload.postcode, 'BN1 1AA')
  assert.equal(normalised.payload.message, 'Fictional cleaning request.')
})

test('free-text limits are rejected rather than silently losing user input', () => {
  const result = validate({
    ...validPayload,
    parking_access: 'a'.repeat(QUOTE_REQUEST_LIMITS.parking_access + 1),
    message: 'm'.repeat(QUOTE_REQUEST_LIMITS.message + 1),
  })
  assert.equal(result.ok, false)
  assert.match(result.errors.parking_access, /characters or fewer/)
  assert.match(result.errors.message, /characters or fewer/)
})

test('active source files use numeric bedroom/bathroom fields', () => {
  assert.match(typeSource, /bedrooms\?: number \| null/)
  assert.match(typeSource, /bathrooms\?: number \| null/)
  assert.match(validationSource, /function parseCount/)
  assert.match(validationSource, /photo_url/)
  assert.doesNotMatch(formSource, /photo_link:/)
  assert.match(formSource, /value: '0', label: 'Studio \/ none'/)
  assert.match(formSource, /'Gym & Studio'/)
  assert.match(schemaSource, /bedrooms integer/)
  assert.match(schemaSource, /bathrooms integer/)
})

test('Supabase schema accepts all active service types and has useful indexes', () => {
  assert.match(schemaSource, /'Gym & Studio'/)
  assert.match(schemaSource, /inbound_submissions_service_type_check/)
  assert.match(schemaSource, /inbound_submissions_created_at_idx/)
  assert.match(schemaSource, /set_inbound_submissions_updated_at/)
})

test('quote API uses POST-only insert without read-after-insert', () => {
  assert.doesNotMatch(apiSource, /select\('id'\)\.single\(\)/)
  assert.doesNotMatch(apiSource, /submission_id/)
  assert.match(apiSource, /\.from\('inbound_submissions'\)\.insert\(/)
})

test('quote API keeps stable user-safe response categories and validates before persistence', () => {
  const responseSources = `${apiSource}\n${processingSource}`
  for (const code of ['RATE_LIMITED', 'INVALID_REQUEST', 'SUBMISSION_REJECTED', 'VALIDATION_ERROR', 'PERSISTENCE_ERROR', 'SERVICE_UNAVAILABLE']) {
    assert.match(responseSources, new RegExp(code))
  }
  assert.match(apiSource, /processQuoteRequest\(body/)
  assert.doesNotMatch(apiSource, /stack|serviceRoleKey|SUPABASE_SERVICE_ROLE_KEY/)
})

test('request processing rejects invalid and honeypot payloads without persistence', async () => {
  let calls = 0
  const persist = async () => {
    calls += 1
    return { error: null }
  }

  const invalid = await processQuoteRequest({ ...validPayload, email: 'bad' }, persist)
  assert.equal(invalid.ok, false)
  assert.equal(invalid.code, 'VALIDATION_ERROR')
  assert.equal(typeof invalid.errors.email, 'string')

  const honeypot = await processQuoteRequest({ ...validPayload, website: 'spam' }, persist)
  assert.equal(honeypot.ok, false)
  assert.equal(honeypot.code, 'SUBMISSION_REJECTED')
  assert.equal(honeypot.errors, undefined)
  assert.equal(calls, 0)
})

test('request processing normalises valid data and reports persistence outcomes', async () => {
  let stored
  const accepted = await processQuoteRequest(
    { ...validPayload, name: '  Casey Example ', postcode: ' bn1 1aa ' },
    async (payload) => {
      stored = payload
      return { error: null }
    },
  )
  assert.deepEqual(accepted, { ok: true, status: 200 })
  assert.equal(stored.name, 'Casey Example')
  assert.equal(stored.postcode, 'BN1 1AA')

  const failed = await processQuoteRequest(validPayload, async () => ({ error: new Error('fictional failure') }))
  assert.equal(failed.ok, false)
  assert.equal(failed.code, 'PERSISTENCE_ERROR')
  assert.equal(failed.status, 500)
})

test('QuoteForm exposes linked field errors, focusable summary and accessible success recovery', () => {
  assert.match(formSource, /validateQuoteRequest\(form\)/)
  assert.match(formSource, /role="alert"/)
  assert.match(formSource, /aria-labelledby="quote-error-title"/)
  assert.match(formSource, /href=\{`#\$\{summaryTarget\}`\}/)
  assert.match(formSource, /'aria-invalid'/)
  assert.match(formSource, /'aria-describedby'/)
  assert.match(formSource, /errorSummaryRef\.current\?\.focus\(\)/)
  assert.match(formSource, /role="status"/)
  assert.match(formSource, /successRef\.current\?\.focus\(\)/)
  assert.match(formSource, /nameRef\.current\?\.focus\(\)/)
  assert.match(formSource, /<fieldset/)
  assert.match(formSource, /<legend/)
  assert.doesNotMatch(formSource, /aria-modal="true"/)
})

test('QuoteForm urgency error-summary target is unique and focusable', () => {
  const idMatches = [...formSource.matchAll(/(High|Medium|Low): '(urgency-[a-z]+)'/g)]
  const radioIds = Object.fromEntries(idMatches.map(([, urgency, id]) => [urgency, id]))
  assert.deepEqual(radioIds, {
    High: 'urgency-high',
    Medium: 'urgency-medium',
    Low: 'urgency-low',
  })
  assert.equal(new Set(Object.values(radioIds)).size, 3)
  assert.match(formSource, /urgency: URGENCY_RADIO_IDS\.Medium/)
  assert.match(formSource, /id=\{URGENCY_RADIO_IDS\[value\]\}/)
  assert.match(formSource, /focusSummaryTarget\(summaryTarget\)/)
  assert.match(formSource, /document\.getElementById\(targetId\)\?\.focus\(\)/)
  assert.match(formSource, /'aria-describedby'/)
})

test('QuoteForm preserves entered values on validation and server failures', () => {
  const resetOccurrences = formSource.match(/setForm\(INITIAL\)/g) || []
  assert.equal(resetOccurrences.length, 1)
  assert.ok(formSource.indexOf('setForm(INITIAL)') > formSource.indexOf('if (!response.ok)'))
  assert.match(formSource, /setErrors\(fieldErrors\)/)
})

test('project uses root-level Next.js App Router structure without src folder', () => {
  assert.equal(fs.existsSync(path.join(root, 'src')), false)
  assert.equal(fs.existsSync(path.join(root, 'app')), true)
  assert.equal(fs.existsSync(path.join(root, 'components')), true)
  assert.equal(fs.existsSync(path.join(root, 'lib')), true)
  assert.equal(fs.existsSync(path.join(root, 'types')), true)
})

test('TypeScript alias maps @/* to project root, not ./src/*', () => {
  const tsconfig = fs.readFileSync(path.join(root, 'tsconfig.json'), 'utf8')
  assert.match(tsconfig, /"@\/\*"\s*:\s*\["\.\/\*"\]/)
  assert.doesNotMatch(tsconfig, /\.\/src\/\*/)
})

test('placeholder scanner checks root-level active code folders', () => {
  const scanner = fs.readFileSync(path.join(root, 'scripts/check-placeholders.cjs'), 'utf8')
  assert.match(scanner, /'app'/)
  assert.match(scanner, /'components'/)
  assert.match(scanner, /'lib'/)
  assert.match(scanner, /'types'/)
  assert.doesNotMatch(scanner, /\['src'\]/)
})
