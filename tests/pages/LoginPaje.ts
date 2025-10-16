import { expect, Page } from '@playwright/test'

export class LoginPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async visit() {
    await this.page.goto('http://localhost:3000/admin/login')
  }

  async isVisible() {
    const loginForm = this.page.locator('.login-form')
    await expect(loginForm).toBeVisible()
  }

  async submitLoginForm(username: string, password: string) {
    await this.page.getByPlaceholder('E-mail').fill(username)
    await this.page.getByPlaceholder('Senha').fill(password)
    await this.page.getByText('Entrar').click()
    //await this.page.getByRole('button', { name: 'Entrar' }).click()
  }

  // async isLoggedIn() {
  //   await this.page.waitForLoadState('networkidle')
  //   await expect(this.page).toHaveURL(/.*admin/)
  // }

  async alertEmailHaveText(field: 'email' | 'password', text: string) {
    const seletor = field === 'email' ? '.email-alert' : '.password-alert'
    const alert = this.page.locator(seletor)
    await expect(alert).toHaveText(text)
  }
}
//admin@zombiesplus.com - pwd123
