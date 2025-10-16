import { expect } from '@playwright/test'
import { test } from '../support'
// import { LandingPage } from '../pages/LandingPaje'
import { Toast } from '../pages/Components'
import { faker } from '@faker-js/faker'

// let landingPage: LandingPage
// let toast: Toast

// test.beforeEach(async ({ page }) => {
//   landingPage = new LandingPage(page)
//   toast = new Toast(page)
// })

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const name = faker.person.fullName()
  const email = faker.internet.email()
  //step1 - visitar a página
  // await page.goto('http://localhost:3000/')
  // const landingPage = new LandingPage(page)
  await page.landing.visit()

  // await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  // essa tag tem a função de localizar o campo pelo atributo name
  // await page
  //   .getByRole('button', { name: 'Aperte o play... se tiver coragem' })
  //   .click()

  // outro ponto a ser observado é o uso de // para diminuir o tamanho da string. Ele funciona como o contains.

  //step2 - Clicar para abrir a modal
  await page.landing.openModal()

  // await page.getByRole('button', { name: /Aperte o play/ }).click()

  // await expect(page.getByTestId('modal').getByRole('heading')).toHaveText(
  //   'Fila de espera'
  // )
  // await page.locator('#name').fill('cleibernerymelo@gmail.com')
  //outra abordagem usando outros nomes de propriedades dentro de uma tag
  // await page
  //   .locator('input[placeholder="Seu nome completo"]')
  //   .fill('cleibernerymelo@gmail.com')

  // outra abordagem usando o metodo getByPlaceholder

  //step3 - Preencher o formulário
  await page.landing.fillForm(name, email)
  // await page.getByPlaceholder('Informe seu nome').fill('Cleiber Nery de Melo')
  // await page
  //   .getByPlaceholder('Informe seu email')
  //   .fill('cleibernerymelo@gmail.com')

  await page.landing.submitForm()

  //await page.getByTestId('modal').getByText('Quero entrar na fila').click()

  //o codigo abaixo comentado, é uma estrategia para capturar texto ou elementos de um toast.

  // await page.getByText('seus dados conosco').click()
  // const content = await page.content()
  // console.log(content)

  //step4 - Validar o toast de sucesso
  await page.landing.getSuccessMessage()

  // const message =
  //   'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  // await expect(page.locator('.toast')).toHaveText(message)

  //estrategia para eu garantir que o toast esta visivel sem ter que usar timeout
  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })
  // await expect(page.getByTestId('modal').getByRole('heading')).toHaveText(
  //   'Obrigado por se inscrever na fila de espera!'
  // )

  // Expect a title "to contain" a substring.
  // await page.waitForTimeout(2000)
})

test('não deve cadastrar quando o email já existe', async ({
  page,
  request
}) => {
  const name = faker.person.fullName()
  const email = faker.internet.email()
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: name,
      email: email
    }
  })

  expect(newLead.ok()).toBeTruthy()

  //step1 - visitar a página
  await page.landing.visit()
  //step2 - Clicar para abrir a modal
  await page.landing.openModal()

  await page.landing.fillForm(name, email)
  await page.landing.submitForm()
  const message =
    'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  // await landingPage.getSuccessMessage()
  await page.toast.haveText(message)
  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })
})

test('não deve cadastrar com email inválido', async ({ page }) => {
  //const landingPage = new page.landingPage(page)

  await page.goto('http://localhost:3000/')

  await page.getByRole('button', { name: /Aperte o play/ }).click()

  await expect(page.getByTestId('modal').getByRole('heading')).toHaveText(
    'Fila de espera'
  )

  await page.getByPlaceholder('Informe seu nome').fill('Cleiber Nery de Melo')

  await page.getByPlaceholder('Informe seu email').fill('cleibernerymelo@')

  await page.getByTestId('modal').getByText('Quero entrar na fila').click()

  // await expect(page.locator('.alert')).toBeVisible()
  await page.landing.getErrorMessage()

  // const message =
  //   'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  // await expect(page.locator('.toast')).toHaveText(message)

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })
})
