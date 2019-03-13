import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [ 
       {
          path: '',
          name: 'home',
          component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
        },
        {
          path: '/item',
          name: 'item',
          component: () => import(/* webpackChunkName: "about" */ './views/Item.vue')
        },
        {
          path: '/score',
          name: 'score',
          component: () => import(/* webpackChunkName: "about" */ './views/Score.vue')
        }          
       ]
})
