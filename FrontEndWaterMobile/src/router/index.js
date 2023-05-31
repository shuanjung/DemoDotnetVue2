import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/olmap',
    name: 'Olmap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Olmap.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/maptest',
    name: 'maptest',
    component: () => import('../views/MapTest.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const login = await axios.post("api/LoginCheck").then(response => response.data);
    if (login) {
      next()
    } else {
      next("/")
    }
  } else {
    next()
  }
})

export default router
