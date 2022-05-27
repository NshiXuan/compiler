import { createRouter, createWebHashHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/view/main/src/main.vue') },
  {
    path: '/character',
    component: () => import('@/view/character-table/src/character-table.vue')
  },
  {
    path: '/word',
    component: () => import('@/view/word-category/src/word-category.vue')
  },
  {
    path: '/keyword',
    component: () => import('@/view/keyword-table/src/keyword-table.vue')
  },
  {
    path: '/single',
    component: () => import('@/view/single-character/src/single-character.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
