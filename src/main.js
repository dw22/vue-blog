import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/highlight.monokai-sublime.min.9.8.0.css'
import './assets/css/simplemde.min.css'
import './assets/css/admin.css'

import App from './App'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  routes : routes,
  linkActiveClass:'v-link-active',
  
})
router.beforeEach((to, from, next) => {
  if (document.cookie.indexOf('o-token') == -1) {
    if(to.path == '/login'){
      next()
    }else{
      next({path: '/login'})
    }
  }else {
    next()
  }
})

new Vue({
  el:'#app',
  store,
  router,
  render: h => h(App)
})
