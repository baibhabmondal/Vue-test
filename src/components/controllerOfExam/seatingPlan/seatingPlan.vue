<template>
<div id="app">
  <v-app id="inspire">
    <div class="text-xs-center">
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                   <span v-for="room in rooms" :key='room.room'> 
                    <span>{{ room.room }}</span>   
                  <v-text-field v-model="editedItem[room.room]" label=""></v-text-field>
                  </span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
              <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3>
                  <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date" lazy transition="scale-transition"
                    offset-y full-width min-width="290px">
                    <v-text-field solo slot="activator" v-model="date" label="Select the date" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="datePicked">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            <v-layout row class="mt-4">
              <v-flex xs12 sm3 offset-sm3>
                <v-subheader v-text="'Select the rooms to rule out'"></v-subheader>
              </v-flex>
              <v-flex xs12 sm3>
                <v-select solo :items="initialRooms" v-model="finalRooms" label="Select The rooms" multiple chips></v-select>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm3 offset-sm3 text-xs-right>
               <v-btn flat @click="selectRooms" class="secondary--text" outline>Select</v-btn>
              </v-flex>
              <v-flex xs12 sm3 text-xs-left>
               <v-btn flat @click="optOutRooms" class="secondary--text" outline>Opt out</v-btn>
              </v-flex>
            </v-layout>
      <v-data-table
        :headers="head"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.course }}</td>
          <td class="text-xs-center" v-for='room in rooms' :key='room.room'>{{ props.item[room.room] }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
      <p>{{ this.items }}</p>
      <p>{{ this.rooms }}</p>
      <v-layout row>
        <v-flex xs12 text-xs-center>
           <v-btn @click="saveSeat" class="secondary">
             Save
           </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </v-app>
</div>
</template>

<script>
export default {
  name: 'seatingPlan',
  data: () => ({
    date: '2018-06-21',
    menu: false,
    items: [],
    finalRooms: [],
    dialog: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    courses () {
      console.log('courses called')
      return this.$store.getters.courses(this.date)
    },
    rooms () {
      return this.$store.getters.finalRooms
    },
    initialRooms () {
      let roomsStore = this.$store.getters.initialRooms
      const rooms = []
      roomsStore.forEach(room => {
        rooms.push(room.room)
      })
      return rooms
    },
    head () {
      const header = [{
        text: 'courses',
        value: 'course',
        sortable: false
      }]
      this.rooms.forEach((room) => {
        let obj = {}
        obj.text = `${room.room} (${room.capacity})`
        obj.value = room.room.toString()
        header.push(
          {
            ...obj,
            sortable: false
          })
      })
      return header
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    saveSeat () {
    },

    optOutRooms () {
      this.$store.dispatch('finalRoomList', this.finalRooms)
    },
    datePicked () {
      this.$refs.menu.save(this.date)
      this.initialize()
    // this.courses()
    },

    selectRooms () {
      let finalList = [...this.initialRooms]
      this.finalRooms.forEach(e => {
        finalList.splice(finalList.findIndex(f => {
          return e === f
        }), 1)
      })
      console.log(finalList)
      this.$store.dispatch('finalRoomList', finalList)
    },
    initialize () {
      this.items = []
      this.courses.forEach((course) => {
        let obj = {}
        this.rooms.forEach(room => {
          obj[room.room] = 10
        })
        this.items.push({
          course: course.code,
          ...obj
        })
      })
      let editedItems = {}
      this.rooms.forEach(room => {
        editedItems[room.room] = 0
      })
      this.editedItem = editedItems
      this.defaultItem = editedItems
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
