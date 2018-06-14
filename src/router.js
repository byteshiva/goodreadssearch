import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import GoodRead from './views/GoodRead.vue'

Vue.use(Router)

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

export default new Router({
  mode: 'history',
  base: getBaseURL ('prod'),
  routes: [
    {
      path: '/',
      name: 'search',
      component: GoodRead
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/goodread',
      name: 'goodread',
      component: GoodRead
    },
    {
      path: '/',
      name: 'home',
      component: GoodRead
    },
    {
      path: '/pd/:id/kw/:kword',
      name: 'pager',
      component: GoodRead
    }
  ]
})
