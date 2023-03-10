import { expect, test } from '@playwright/test'

test('Broccoli & Co. page is render as expected', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Broccoli & Co./)
  await expect(page.getByTestId('hero-request-invite')).toBeEnabled()
})

test('Request invite successfully', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('hero-request-invite').click()

  const requestForm = page.getByTestId('request-form')

  await expect(requestForm).toBeVisible()

  await requestForm.getByTestId('full-name-input').type('Playwright Rock')
  await requestForm.getByTestId('email-input').type('playwright@example.com')
  await requestForm.getByTestId('confirm-email-input').type('playwright@example.com')
  await requestForm.getByTestId('submit-invite-request').click()

  await page.getByTestId('request-success').isVisible()
  await page.getByTestId('confirm').click()
  await page.getByTestId('request-success').isHidden()

  await requestForm.isHidden()
})

test('Request invite failed', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('hero-request-invite').click()

  const requestForm = page.getByTestId('request-form')

  await expect(requestForm).toBeVisible()

  await requestForm.getByTestId('full-name-input').type('Playwright Rock')
  await requestForm.getByTestId('email-input').type('usedemail@airwallex.com')
  await requestForm.getByTestId('confirm-email-input').type('usedemail@airwallex.com')
  await requestForm.getByTestId('submit-invite-request').click()

  await page.getByTestId('request-error').isVisible()
  await page.getByTestId('try-again').click()
  await page.getByTestId('request-error').isHidden()

  await requestForm.isVisible()
})
