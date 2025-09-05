import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const routes = [{
  path: '/',
  component: App,
  meta: {
    title: 'NYS',
    metaTags: [{
      name: 'description',
      content: 'New York State COVID 19 info'
    },
    {
      property: 'og:description',
      content: 'New York State COVID 19 info'
    }
    ]
  }
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
