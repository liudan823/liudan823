import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/users',
    children: [{
      path: 'users',
      name: 'Users',
      component: () => import( /* webpackChunkName: "users" */ '../views/Users.vue')
    }, {
      path: 'goods',
      name: 'Goods',
      component: () => import( /* webpackChunkName: "goods" */ '../views/Goods.vue')
    }, {
      path: 'roles',
      name: 'Roles',
      component: () => import( /* webpackChunkName: "roles" */ '../views/Roles.vue')
    }, {
      path: 'rights',
      name: 'Rights',
      component: () => import( /* webpackChunkName: "rights" */ '../views/Rights.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login') {
    if (!store.state.token) {
      next({
        replace: true,
        name: 'Login'
      })
      return;
    }
    next()
    return;
  }
  next()
})

export default router