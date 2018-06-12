import Vue from 'vue'
import './plugins/axios'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: App, name: 'home' },
    { path: '/pd/:id/kw/:kword', component: App, name: 'pager' } //,
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
