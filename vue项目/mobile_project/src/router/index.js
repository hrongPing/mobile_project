import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: () => import('@/components/login.vue')
  }, {
    path: '/',
    component: () => import('@/components/layout/index.vue'),
    children: [
      { path: '', component: () => import('@/components/home/index.vue') },
      { path: '/qa', component: () => import('@/components/qa/index.vue') },
      { path: '/videw', component: () => import('@/components/videw/index.vue') },
      { path: '/my', component: () => import('@/components/my/index.vue') }
    ]
  },
  {
    path: '/search', component: () => import('@/components/search/Search.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/components/article/Article-Container.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
