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
    const cards = page.locator('.service-card')
    await expect(cards).toHaveCount(6)
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded()
      const img = card.locator('img')
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
    await page.screenshot({ path: `test-results/homepage-${width}.png`, fullPage: true })
  })
}
