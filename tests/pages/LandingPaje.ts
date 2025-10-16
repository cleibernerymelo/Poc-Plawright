import { expect, Page } from '@playwright/test'

export class LandingPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async visit() {
    await this.page.goto('http://localhost:3000/')
  }

  async openModal() {
    await this.page.getByRole('button', { name: /Aperte o play/ }).click()
    await expect(
      this.page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera')
  }

  async fillForm(name: string, email: string) {
    await this.page.getByPlaceholder('Informe seu nome').fill(name)
    await this.page.getByPlaceholder('Informe seu email').fill(email)
  }

  async submitForm() {
    await this.page
      .getByTestId('modal')
      .getByText('Quero entrar na fila')
      .click()
  }

  async getSuccessMessage() {
    const message =
      'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
    await expect(this.page.locator('.toast')).toHaveText(message)
  }

  async getErrorMessage() {
    await expect(this.page.locator('.alert')).toBeVisible()
  }
}
