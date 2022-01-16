import Vue from 'vue'
import VueRouter from 'vue-router'
import Employees from "@/views/Employees";
import Companies from "@/views/Companies";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
