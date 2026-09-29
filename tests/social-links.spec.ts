import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Social Links Tests
 *
 * These tests verify that:
 * 1. Social media links are present and functional
 * 2. Defunct platforms (like Google+) are not present
 * 3. All social icons link to correct destinations
 *
 * Note: Test expectations use values from test.config.ts for easy customization
 */

test.describe('Footer Social Links', () => {
  test('should not contain Google+ social link', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Check that Google+ link is not present
    const googlePlusLink = page.locator('footer a[href*="plus.google.com"]')
    await expect(googlePlusLink).toHaveCount(0)

    // Also check that Google Plus label is not present
    const googlePlusLabel = page.locator('footer a[aria-label="Google Plus"]')
    await expect(googlePlusLabel).toHaveCount(0)
  })

  test('should display active social media links', async ({ page }) => {
    test.skip(testConfig.socialLinks.length === 0, 'No social links are configured for this site.')
    await page.goto('/')
    for (const social of testConfig.socialLinks) {
      const link = page.locator(`footer a[href*="${social.url}"]`)
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('aria-label', social.ariaLabel)
    }
  })

  test('should render exactly the configured social icons', async ({ page }) => {
    await page.goto('/')
    const selector = testConfig.allSocialLabels
      .map((label) => `footer a[aria-label="${label}"]`)
      .join(', ')
    if (selector === '') {
      // No platforms configured: no social icon links at all.
      for (const label of [
        'Facebook',
        'X (Twitter)',
        'LinkedIn',
        'GitHub',
        'Instagram',
        'YouTube',
      ]) {
        await expect(page.locator(`footer a[aria-label="${label}"]`)).toHaveCount(0)
      }
      return
    }
    await expect(page.locator(selector)).toHaveCount(testConfig.socialLinks.length)
  })
})
