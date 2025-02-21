import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from "@/router/routes"

Vue.use(VueRouter)



NProgress.configure({
  showSpinner: false,
  speed: 800,
});


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
