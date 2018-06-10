import Vue from 'vue'
import Router from 'vue-router'
import GoodRead from '@/components/GoodRead'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/gd/:id',
      name: 'GoodRead',
      component: GoodRead,
      props: true
    },
    {
      path: '/',
      name: 'GoodRead',
      component: GoodRead,
      props: true
    },
    {
      path: '/:id',
      name: 'GoodRead',
      component: GoodRead,
      props: true
    },
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123"></router-view>
    </div>
  `
}).$mount('#app')
