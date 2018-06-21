import { mount, createLocalVue } from '@vue/test-utils'
import sample from '@/components/sample.vue'
import Vuetify from 'vuetify'
import flushPromises from 'flush-promises'

let wrapper
let localVue
describe('sample', () => {
  beforeEach(() => {
    const Vue = createLocalVue()
    Vue.use(Vuetify)
    localVue = Vue
    wrapper = mount(sample, {localVue})
  })
  it('Should have a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })
  it('Should display count', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })
  it('the input needs to be modelled', () => {
      const text = wrapper.vm.input
      wrapper.find('#text').trigger('input')
      expect(wrapper.find('#text').element.value).toBe(text)
  })
  it('the method is returning some value', () => {
      expect(wrapper.vm.addMethod()).toBe(0)
  })
  it('The method must be called once', async () => {
      const button = wrapper.find('button')
      const spy = jest.fn()
      wrapper.vm.add = spy
      wrapper.vm.$on('click', spy)
      button.trigger('click')
      expect(spy).toHaveBeenCalledTimes(1)
  })
})