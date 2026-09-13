const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const test = require('node:test')

const websiteRoot = process.cwd()
const openApiPath = resolve(websiteRoot, 'docs', 'quote-request.openapi.yaml')
const workflowPath = resolve(websiteRoot, '.github', 'workflows', 'quality.yml')

function read(path) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
}

test('quote-request OpenAPI source matches the implemented public contract', () => {
  const document = read(openApiPath)

  assert.match(document, /^openapi: 3\.1\.1$/m)
  assert.match(document, /^  \/api\/quote-request:$/m)
  assert.match(document, /^    post:$/m)

  for (const field of ['name', 'phone', 'email', 'service_type', 'postcode', 'consent']) {
    assert.match(document, new RegExp(`        - ${field}$`, 'm'))
  }

  for (const field of ['name', 'phone', 'email', 'service_type', 'postcode', 'property_type', 'bedrooms', 'bathrooms', 'preferred_date', 'urgency', 'parking_access', 'access_notes', 'photo_url', 'photo_link', 'message', 'consent', 'website']) {
    assert.match(document, new RegExp(`^        ${field}:$`, 'm'))
  }

  for (const value of ['End of Tenancy', 'Airbnb / Short-Let', 'Office Cleaning', 'Domestic', 'Deep Clean', 'Gym & Studio', 'Other']) {
    assert.match(document, new RegExp(`            - ${value}$`, 'm'))
  }

  for (const status of ['200', '400', '429', '500', '503']) {
    assert.match(document, new RegExp(`        '${status}':`))
  }

  for (const code of ['INVALID_REQUEST', 'SUBMISSION_REJECTED', 'VALIDATION_ERROR', 'RATE_LIMITED', 'PERSISTENCE_ERROR', 'SERVICE_UNAVAILABLE']) {
    assert.match(document, new RegExp(`const: ${code}`))
  }

  assert.match(document, /default: Medium/)
  assert.match(document, /writeOnly: true/)
  assert.match(document, /deprecated: true/)
  assert.match(document, /example\.test/)
  assert.match(document, /code: VALIDATION_ERROR/)
  assert.match(document, /code: RATE_LIMITED/)
  assert.match(document, /code: PERSISTENCE_ERROR/)
  assert.doesNotMatch(document, /localhost|127\.0\.0\.1|SUPABASE_SERVICE_ROLE_KEY|service_role|Local App|automatic intake/i)
})

test('Website quality workflow uses only verified commands', () => {
  const workflow = read(workflowPath)

  assert.match(workflow, /^name: Website quality$/m)
  assert.match(workflow, /^  push:$/m)
  assert.match(workflow, /^  pull_request:$/m)
  assert.match(workflow, /^permissions:\n  contents: read$/m)
  assert.match(workflow, /^    runs-on: ubuntu-latest$/m)
  assert.match(workflow, /actions\/checkout@v4/)
  assert.match(workflow, /actions\/setup-node@v4/)
  assert.match(workflow, /node-version: '22'/)
  assert.match(workflow, /cache: npm/)

  for (const command of ['npm ci', 'npm test', 'npm run typecheck', 'npm run build']) {
    assert.match(workflow, new RegExp(`- run: ${command.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))
  }

  assert.doesNotMatch(workflow, /lint|deploy|secrets|pull_request_target/i)
})
