import { expect, Page } from '@playwright/test'

export class MoviesPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async isLoggedIn() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.page).toHaveURL(/.*admin/)
  }

  async create(
    title: string,
    overview: string,
    company: string,
    release_year: string
  ) {}
}
