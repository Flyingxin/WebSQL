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
    path: '/exportText',
    name: 'exportWord',
    component: () => import('@/components/docx/export-word.vue'),  
  },
  {
    path: '/exportChart',
    name: 'exportChart',
    component: () => import('@/components/docx/export-chart.vue'),  
  },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  routes
})

export default router