import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

async function completeRequiredFields(page: import('@playwright/test').Page) {
  await page.getByLabel('Phone').fill('07700 900123')
  await page.getByLabel('Email').fill('browser-test@example.test')
  await page.getByLabel('Service type').selectOption('Domestic')
  await page.getByLabel('Property postcode').fill('BN1 1AA')
  await page.getByRole('checkbox').check()
  await page.getByLabel('Full name').fill('Example Browser Test')
}

async function openContact(page: import('@playwright/test').Page) {
  await page.goto('/contact', { waitUntil: 'networkidle' })
  await expect(page.getByRole('button', { name: 'Send quote request' })).toBeVisible()
}

function errorSummary(page: import('@playwright/test').Page) {
  return page.getByRole('alert').filter({ has: page.getByRole('heading', { name: 'Check the following fields' }) })
}

async function tabUntilFocused(
  page: import('@playwright/test').Page,
  target: import('@playwright/test').Locator,
  maximumTabs: number,
) {
  for (let count = 0; count < maximumTabs; count += 1) {
    if (await target.evaluate((element) => document.activeElement === element)) return
    await page.keyboard.press('Tab')
  }

  await expect(target).toBeFocused()
}

test('invalid submission focuses linked errors without sending a request', async ({ page }) => {
  let requestCount = 0
  await page.route('**/api/quote-request', async (route) => {
    requestCount += 1
    await route.abort()
  })

  await openContact(page)
  await expect(page.getByRole('heading', { name: 'Request a cleaning quote' })).toBeVisible()
  await page.getByRole('button', { name: 'Send quote request' }).press('Enter')

  const summary = errorSummary(page)
  await expect(summary).toBeVisible()
  await expect(summary).toBeFocused()
  await expect(summary.getByRole('link', { name: /Full name: Enter your full name/ })).toBeVisible()
  await summary.getByRole('link', { name: /Full name: Enter your full name/ }).press('Enter')
  await expect(page.getByLabel('Full name')).toBeFocused()
  await expect(page.getByLabel('Full name')).toHaveAttribute('aria-describedby', /name-error/)
  expect(requestCount).toBe(0)

  await completeRequiredFields(page)
  await page.route('**/api/quote-request', async (route) => {
    requestCount += 1
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Check the highlighted fields and try again.',
        errors: { urgency: 'Select a valid urgency.' },
      }),
    })
  })
  await page.getByRole('button', { name: 'Send quote request' }).press('Enter')

  await expect(summary).toBeFocused()
  await summary.getByRole('link', { name: /Urgency: Select a valid urgency/ }).press('Enter')
  await expect(page.getByRole('radio', { name: 'Medium' })).toBeFocused()
  expect(requestCount).toBe(1)
})

test('fictional successful submission is mocked and restores focus predictably', async ({ page }) => {
  const mockedSuccessResponse = { ok: true }
  let resolveInterceptedRequest: (request: {
    method: string
    url: string
    payload: Record<string, unknown>
  }) => void
  const interceptedRequest = new Promise<{
    method: string
    url: string
    payload: Record<string, unknown>
  }>((resolve) => {
    resolveInterceptedRequest = resolve
  })

  await page.route('**/api/quote-request', async (route) => {
    const request = route.request()
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockedSuccessResponse),
    })
    resolveInterceptedRequest({
      method: request.method(),
      url: request.url(),
      payload: request.postDataJSON() as Record<string, unknown>,
    })
  })

  await openContact(page)
  await completeRequiredFields(page)
  await page.getByRole('button', { name: 'Send quote request' }).press('Enter')
  const submittedRequest = await interceptedRequest

  const success = page.getByRole('status')
  await expect(success).toBeVisible()
  await expect(success).toBeFocused()
  await expect(success.getByRole('heading', { name: 'Quote request received' })).toBeVisible()
  expect(mockedSuccessResponse).toEqual({ ok: true })
  expect(submittedRequest.method).toBe('POST')
  expect(new URL(submittedRequest.url).pathname).toBe('/api/quote-request')
  expect(submittedRequest.payload).toMatchObject({
    name: 'Example Browser Test',
    email: 'browser-test@example.test',
    postcode: 'BN1 1AA',
    consent: true,
  })

  await page.getByRole('button', { name: 'Send another request' }).press('Enter')
  await expect(page.getByLabel('Full name')).toBeFocused()
  await expect(page.getByLabel('Full name')).toHaveValue('')
})

test('keyboard operation reaches urgency controls and the submit button', async ({ page }) => {
  await openContact(page)

  const highUrgency = page.getByRole('radio', { name: 'High' })
  await highUrgency.focus()
  await page.keyboard.press('Space')
  await expect(highUrgency).toBeChecked()

  const consent = page.getByRole('checkbox')
  await consent.focus()
  await expect(page.getByRole('link', { name: 'privacy policy', exact: true })).toHaveAttribute('href', '/privacy-policy')
  await tabUntilFocused(page, page.getByRole('button', { name: 'Send quote request' }), 2)
})

test('contact page has no serious or critical axe violations', async ({ page }) => {
  await openContact(page)

  const results = await new AxeBuilder({ page }).analyze()
  const blockingViolations = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  )

  expect(blockingViolations).toEqual([])
})
