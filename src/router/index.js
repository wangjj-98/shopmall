import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/home/Home.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Category = () => import('views/category/Category.vue')
const Detail = () => import('views/detail/Detail.vue')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/detail/:id', component: Detail, name: 'detail' },
  { path: '/profile', component: Profile },
  { path: '/category', component: Category },
  { path: '/cart', component: Cart }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
