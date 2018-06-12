import Vue from 'vue'
import './plugins/axios'
import VueRouter from 'vue-router'
import App from './App.vue'

const ghbasename = 'goodreadssearch';
const testname = 'test';

function getBaseURL (gdenv) {
    var baseURL;
    if (gdenv === 'prod') {
      baseURL = ghbasename;
    } else if (gdenv === 'dev') {
      baseURL = __dirname;
    } else {
      baseURL = testname ;
    }  
    return baseURL;
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: getBaseURL ('prod'),
  routes: [
    { path: '/', component: App, name: 'home'},
    { path: '/pd/:id/kw/:kword', component: App, name: 'pager' }
  ]
})


Vue.config.productionTip = false

// Interceptor could be used to set any global parameters like bypassing CSRF Ajax Request
// Vue.http.interceptors.push(function(request, next) {
//   request.headers['X-Requested-With'] = 'XMLHttpRequest'
//   next()
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
