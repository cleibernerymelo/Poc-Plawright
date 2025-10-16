import { expect, Page } from '@playwright/test'

export class Toast {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }
  async haveText(message: string) {
    const toast = this.page.locator('.toast')
    await expect(toast).toHaveText(message)
    await expect(toast).not.toBeVisible({ timeout: 5000 })
  }
}
