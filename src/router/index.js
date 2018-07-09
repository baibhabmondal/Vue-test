import Vue from 'vue'
import Router from 'vue-router'
import academicSchedule from '@/components/controllerOfExam/academicSchedule/academicSchedule.vue'
import sample from '../components/sample.vue'
import seatingPlan from '../components/controllerOfExam/seatingPlan/seatingPlan.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Academic',
      component: academicSchedule
    },
    {
      path: '/seatingPlan',
      name: 'seatingPlan',
      component: seatingPlan
    },
    {
      path: '/sample',
      name: 'sample',
      component: sample
    }
  ]
})
