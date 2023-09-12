import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: {name: 'userInfo'},
    component: () => import('@/App.vue'),
    children: [
      {
        path: '/user',
        name: 'userInfo',
        component: () => import('@/components/user-info.vue'),
      },      
    ]
  },
  {
    path: '/exportWord1',
    name: 'exportWord1',
    component: () => import('@/components/docx/export-word1.vue'),  
  },
  {
    path: '/exportWord2',
    name: 'exportWord2',
    component: () => import('@/components/docx/export-word2.vue'),  
  },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  routes
})

export default router