import { expect, test } from '@playwright/test'

for (const width of [320, 375, 390, 430, 768, 1440]) {
  test(`homepage images and card layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const hero = page.locator('.home-hero__image')
    await expect(hero).toBeVisible()
    await expect.poll(() => hero.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0)
    const heroRatio = await hero.evaluate((img: HTMLImageElement) => img.clientWidth / img.clientHeight)
    expect(Math.abs(heroRatio - 1672 / 940)).toBeLessThan(0.02)
    await expect(hero).toHaveAttribute('src', /brightshore-cleaning-homepage-hero/ )
    const expectedImages = ['end-of-tenancy-cleaning', 'airbnb-short-let-cleaning', 'office-commercial-cleaning', 'gym-studio-cleaning', 'clinic-local-organisation-cleaning', 'domestic-deep-cleaning']
    const cards = page.locator('.service-card')
    await expect(cards).toHaveCount(6)
    for (const [index, card] of (await cards.all()).entries()) {
      await card.scrollIntoViewIfNeeded()
      const img = card.locator('img')
      await expect(img).toBeVisible()
      await expect(img).toHaveAttribute('src', new RegExp(expectedImages[index]))
      const imageBox = await img.boundingBox()
      expect(imageBox!.width).toBeGreaterThan(100)
      expect(imageBox!.height).toBeGreaterThan(60)
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0)
      await expect(img).toHaveAttribute('alt', /.+/)
      const cta = await card.locator('.service-card__cta').boundingBox()
      expect(cta!.height).toBeGreaterThanOrEqual(44)
      const response = await page.request.get((await card.getAttribute('href'))!)
      expect(response.status()).toBe(200)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (width === 1440) {
      const positions = await cards.locator('.service-card__cta').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().bottom))
      expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(1)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    if (width === 1440) {
      await page.locator('.home-hero').screenshot({ path: 'test-results/desktop-hero.png' })
      await page.locator('#services').screenshot({ path: 'test-results/desktop-services.png' })
      await page.evaluate(() => window.scrollTo(0, 0))
    }
    await page.screenshot({ path: `test-results/homepage-${width}.png`, fullPage: true })
  })
}
