import { test, Page } from '@playwright/test'
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

test('deve logar como administrador', async ({ page }) => {
  //step1 - visitar a página
  // await page.goto('http://localhost:3000/admin/login')
  // const loginForm = page.locator('.login-form')
  // await expect(loginForm).toBeVisible()

  await loginPage.visit()
  await loginPage.isVisible()
  await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({ page }) => {
  const message =
    'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
  await loginPage.visit()
  await loginPage.isVisible()
  await loginPage.submitLoginForm('admin@zombieplus.com', 'pwd1234')
  //await loginPage.toastHaveText(message)
  await toast.haveText(message)
})

test('não deve logar quando o email é inválido', async ({ page }) => {
  await loginPage.visit()
  await loginPage.isVisible()
  await loginPage.submitLoginForm('teste.com.br', 'pwd1234')
  await loginPage.alertEmailHaveText('email', 'Email incorreto')
})

test('não deve logar quando o email não for preenchido', async ({ page }) => {
  await loginPage.visit()
  await loginPage.isVisible()
  await loginPage.submitLoginForm('', 'pwd1234')
  //await loginPage.toastHaveText(message)
  //await toast.haveText(message)
  await loginPage.alertEmailHaveText('email', 'Campo obrigatório')
})

test('não deve logar quando a senha não for preenchido', async ({ page }) => {
  await loginPage.visit()
  await loginPage.isVisible()
  await loginPage.submitLoginForm('cnm@teste.com', '')
  await loginPage.alertEmailHaveText('password', 'Campo obrigatório')
})
