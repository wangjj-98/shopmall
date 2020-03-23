import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/Home.vue')
const Datail = () => import('views/datail/Datail.vue')
const Profile = () => import('views/profile/Profile.vue')
const Category = () => import('views/category/Category.vue')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/datail', component: Datail },
  { path: '/profile', component: Profile },
  { path: '/category', component: Category }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
