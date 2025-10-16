//
// const { test: base } = require('@playwright/test')

// const { LandingPage } = require('../pages/LandingPage')
// const { LoginPage } = require('../pages/LoginPage')
// const { Toast } = require('../pages/Components')
// const { MoviesPage } = require('../pages/MoviesPage')
// const { faker } = require('@faker-js/faker')

// // Extender a fixture `page` com páginas customizadas
// const test = base.extend({
//   page: async ({ page }, use) => {
//     const extendedPage = Object.assign(page, {
//       landing: new LandingPage(page),
//       login: new LoginPage(page),
//       movies: new MoviesPage(page),
//       toast: new Toast(page),
//     })
//     await use(extendedPage)
//   }
// })

// module.exports = { test }

import { test as base, Page } from '@playwright/test'
import { LandingPage } from '../pages/LandingPaje'
import { LoginPage } from '../pages/LoginPaje'
import { Toast } from '../pages/Components'
import { MoviesPage } from '../pages/MoviesPage'
import { faker } from '@faker-js/faker'

// 1️⃣ Criar tipo que estende Page com páginas customizadas
type ExtendedPage = Page & {
  landing: LandingPage
  login: LoginPage
  movies: MoviesPage
  toast: Toast
}

// 2️⃣ Extender a fixture page com ExtendedPage
const test = base.extend<{ page: ExtendedPage }>({
  page: async ({ page }, use) => {
    const extendedPage: ExtendedPage = Object.assign(page, {
      landing: new LandingPage(page),
      login: new LoginPage(page),
      movies: new MoviesPage(page),
      toast: new Toast(page)
    })
    await use(extendedPage)
  }
})

export { test }
