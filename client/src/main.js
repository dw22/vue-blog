/**
 * Created by wanrenya on 2017/2/24.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import './assets/css/highlight.monokai-sublime.min.9.8.0.css'
import  './assets/css/client.css'
import App from './App'
import Index from './views/index'
import Article from './views/article'
import Category from './views/category'
import CategoryForName from './views/category_for_name'
import Tag from './views/tag'

Vue.use(VueRouter)
Vue.filter('format', function (value) {
  if(!value) return '';
  return value.substring(0,10)
})
const routers = [
  {path:'/',component:Index},
  {path:'/article/:id',component:Article},
  {path:'/category',component:Category},
  {path:'/category/:name',component:CategoryForName},
  {path:'/tag',component:Tag},
  {path:'/tag/:name',component:Index}
]
const router = new VueRouter({
  routes : routers,
  mode:'hash'
})
new Vue({
  el:'#app',
  router,
  render:h => h(App)
})
