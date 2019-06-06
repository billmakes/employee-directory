import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/employee/:id',
      name: 'Employee',
      props: true,
      component: () =>
        import(/* webpackChunkName: "employee" */ './views/Employee.vue')
    }
  ]
})
