// import { shallowMount } from '@vue/test-utils'
// import { shallowMount, createLocalVue } from 'vue-test-utils'
// import { scopedVue, shallowMount } from '@vue/test-utils'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import routerConfig from '../../src/router'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import { RouterLinkStub } from '@vue/test-utils'
import GoodReads from '@/components/GoodReads.vue'

// const localVue = scopedVue()

describe('GoodReads.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(GoodReads, {
      propsData: { msg }
    })

    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.find('button#btn').text().trim()).toEqual('Search!')
    expect(wrapper.find('input.form-control').text().trim()).toEqual('')
  })
})

describe('GoodReads.vue Check input if Exits', () => {
    it('Check input if Exits when passed', () => {
      const msg = 'new message'
      const wrapper = mount(GoodReads, {
        propsData: { msg }
      })
      expect(wrapper.find('input.form-control').text().trim()).toEqual('')
    })

  })
  describe('GoodReads.vue if Button Exits', () => {
    it('if Button Exits when passed', () => {
      const msg = 'Search!'
      const wrapper = mount(GoodReads, {
        propsData: { msg }
      })
      expect(wrapper.find('button#btn').text().trim()).toEqual(msg)
    })
  })


  describe('GoodReads.vue if Button Exits and trigger earch fn', () => {
    it('if Button Exits and trigger earch fn when passed', () => {
      const freshLocalVue =  createLocalVue()
      freshLocalVue.use(VueRouter)
      const router = new VueRouter(routerConfig)
      router.push('pd/14/kw/ender')

      const msg = 'Search!'
      const keyword = 'ender'
      const wrapper = mount(GoodReads, {
        freshLocalVue,
        router,
      })

      const input = wrapper.find('input[type="text"]')
      input.setValue(keyword)
      expect(wrapper.find('button#btn').text().trim()).toEqual(msg)
      expect(wrapper.find('button#btn').trigger('click'))
      // expect(wrapper.find('.gd > div:nth-child(2) > ul:nth-child(2) > li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(1)').text().trim()).toEqual("Ender's Game (Ender's Saga, #1)")
      // expect(wrapper.find('.gd > div:nth-child(2) > ul:nth-child(3) > li:nth-child(1) > a:nth-child(1)').text().trim()).toEqual(1)

    })
  })

//   describe('GoodReads.vue if Button Exits and trigger earch fn', () => {
//     it('renders $router.name', () => {
//     const scopedVue = Vue.extend()
//     const $route = {
//         name: 'test name - enlightened'
//     }
//     scopedVue.prototype.$route = $route

//     const Constructor = scopedVue.extend(GoodReads)
//     const vm = new Constructor().$mount()
//     console.log(vm.$el);
//     //expect(vm.$el.find('button#btn').trigger('click'))
//     // expect(vm.$el.textContent).to.equal($route.name)
//     })
//   })