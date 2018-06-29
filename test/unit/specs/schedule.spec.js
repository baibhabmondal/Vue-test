import { mount, createLocalVue } from '@vue/test-utils'
import academicSchedule from '@/components/controllerOfExam/academicSchedule/academicSchedule.vue'
import invigilationSchedule from '@/components/controllerOfExam/invigilationSchedule/invigilationSchedule.vue'
import seatingPlan from '@/components/controllerOfExam/seatingPlan/seatingPlan.vue'
import Vuetify from 'vuetify'

let wrapper
let localVue

describe('academic-schedule', () => {
    beforeEach(() => {
      let Vue = createLocalVue()
      Vue.use(Vuetify)
      localVue = Vue
      wrapper = mount(academicSchedule, {
          localVue
      })
    })
    it('should have a button', () => {
      expect(wrapper.contains('button')).toBe(true)
    })
    it('should have a save button', () => {
        expect(wrapper.contains('#save')).toBe(true)
    })
    it('should have a publish button', () => {
        expect(wrapper.contains('#publish')).toBe(true)
    })

})
describe('invigilation-schedule', () => {
    beforeEach(() => {
      let Vue = createLocalVue()
      Vue.use(Vuetify)
      localVue = Vue
      wrapper = mount(invigilationSchedule, {
          localVue
      })
    })
    it('should have div', () => {
        expect(wrapper.contains('div')).toBe(true)
    })
})
describe('seating-plan', () => {
    beforeEach(() => {
      let Vue = createLocalVue()
      Vue.use(Vuetify)
      localVue = Vue
      wrapper = mount(seatingPlan, {
          localVue
      })
    })
    it('should have div', () => {
      expect(wrapper.contains('div')).toBe(true)
    })
})