import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login/Login.vue'
import Home from './pages/Home/Home.vue'
import Review from './pages/Home/Review.vue'
import slideImg from './pages/Home/slideImg.vue'
import Verification from './pages/Home/Verification.vue'
import downLoad from './pages/Home/downLoad.vue'
import agreenment from './pages/Home/agreenment'
import vipAgreenment from './pages/Home/vipAgreenment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        showTop: true
      }
    },
    {
      path: '/review',
      name: 'Review',
      component: Review,
      meta: {
        showTop: true
      }
    },
    {
      path: '/slideImg',
      name: 'slideImg',
      component: slideImg,
      meta: {
        showTop: true
      }
    },
    {
      path: '/verification',
      name: 'Verification',
      component: Verification,
      meta: {
        showTop: true
      }
    },
    {
      path: '/downLoad',
      name: 'downLoad',
      component: downLoad,
      meta: {
        // showTop: true
      }
    },
    {
      path: '/agreenment',
      name: 'agreenment',
      component: agreenment,
      meta: {
        showTop: true
      }
    },
    {
      path: '/vipAgreenment',
      name: 'vipAgreenment',
      component: vipAgreenment,
      meta: {
        showTop: true
      }
    }
  ]
})
