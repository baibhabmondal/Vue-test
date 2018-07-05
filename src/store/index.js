import Vue from 'vue'
import Vuex from 'vuex'
import seating from './seatingPlan'
import courseSchedule from './courseSchedule'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    seating: seating,
    courseSchedule: courseSchedule
  }
})
