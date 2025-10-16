import { test } from '@playwright/test'

import { LoginPage } from '../pages/LoginPaje'
import { Toast } from '../pages/Components'
import { MoviesPage } from '../pages/MoviesPage'

let loginPage: LoginPage
let toast: Toast
let moviesPage: MoviesPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  toast = new Toast(page)
  moviesPage = new MoviesPage(page)
})

test('deve ser permitido cadastrar um novo filme', async ({ page }) => {
  await loginPage.visit()
  await loginPage.isVisible()
  await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()
})
