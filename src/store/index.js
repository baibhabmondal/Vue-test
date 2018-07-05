import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
 state: {
     plans:[
     {
       date: '2018-06-21',    
       courses: [
            {
             code: '15PD701',
             students: 50
             },
             {
             code: '15PD704',
             students: 50
             },
             {
             code: '15IU701',
             students: 50
             }
         ] 
    },
     {
       date: '2018-06-22',    
       courses: [
            {
             code: '15MA291',
             students: 50
             },
             {
             code: '15ENG704',
             students: 50
             },
             {
             code: '15RRR701',
             students: 50
             }
         ] 
    },
     ], 
       initialRooms: [
         {
             room: '701',
             capacity: 20
         },
         {
             room: '702',
             capacity: 20
         },
         {
             room: '703',
             capacity: 20
         },
         {
             room: '704',
             capacity: 20
         },
         {
             room: '705',
             capacity: 20
         },
         {
             room: '706',
             capacity: 20
         },
         {
             room: '707',
             capacity: 20
         },
         {
             room: '708',
             capacity: 20
         },
         {
             room: '709',
             capacity: 20
         },
       ],
       finalRooms: [
           {
               room: '701',
               capacity: 20
           },
           {
               room: '702',
               capacity: 20
           },
           {
               room: '703',
               capacity: 20
           }
       ]
   },
   getters: {
       initialRooms (state) {
           return state.initialRooms
       },
       finalRooms (state) {
           return state.finalRooms
       },
       courses (state) {
           return (date) => { 
               let index =  state.plans.findIndex( plan => {
               return plan.date === date
           })
           console.log(index)
           return state.plans[index].courses
        }
       }
   },
   mutations: {

    finalRoomList (state, payload) {
        state.finalRooms = payload
    }

   },
   actions: {
       finalRoomList ({commit, getters},payload) {
           const rooms = [...getters.initialRooms]  
           payload.forEach( room => {
               rooms.splice(rooms.findIndex( e => {
                   return e.room === room
               }), 1)
           })
           commit('finalRoomList', rooms)
       }
   }


})