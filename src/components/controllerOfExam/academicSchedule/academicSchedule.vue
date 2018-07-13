<template>
<div>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg3>
          <v-text-field
            solo
            slot="activator"
            v-model="date"
            label="From Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
        </v-menu>
      </v-flex>
      <v-flex xs12 lg3 offset-lg1>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="toDate"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            solo
            id="toDate"
            slot="activator"
            v-model="toDate"
            label="To Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker
            :allowed-dates="allowedDates"
            v-model="toDate"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn
              flat
              color="primary"
              @click="totalDates(date,toDate)"
              :loading="loading"
              :disabled="loading">OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4 mb-4" justify-center>
      <v-data-table :headers="department" :items="items" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.date }}</td>
          <td>
            <v-layout column>
              <v-flex>
                forenoon
              </v-flex>
              <v-flex>
                Afternoon
              </v-flex>
            </v-layout>
          </td>
          <td v-for="item in course" :key="item.department">
            <v-layout column>
            <v-flex>
            <v-select
              multiple
              small-chips
              hide-selected
              deletable-chips
              :items="item.courses"
              item-text="name"
              @input="add($event, props.item.date, item.department, 'forenoon')"
              style="padding: 0;max-width: 100px;">
            </v-select>
          </v-flex>
            <v-flex>
              <v-select
              multiple
              small-chips
              hide-selected
              deletable-chips
              :items="item.courses"
              item-text="name"
              @input="add($event, props.item.date, item.department, 'afternoon')"
              style="padding: 0;max-width: 100px;">
            </v-select>
          </v-flex>
          </v-layout>
          </td>
        </template>
      </v-data-table>
    </v-layout>
    <v-layout row text-xs-center>
      <v-flex text-xs-right>
        <v-btn class="red white--text">
          Clear
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn class="primary">
          Save
        </v-btn>
      </v-flex>
      <v-flex text-xs-left>
        <v-btn class="secondary">
          Publish
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      date: null,
      menu: false,
      toDate: null,
      dispDates: 0,
      course: [],
      items: [],
      selectedCourse: [],
      final: []
    }
  },
  async created () {
    this.date = '2018-06-29'
    const response = await axios.get('http://localhost:3000/courses')
    this.course = response.data
    this.course.forEach(item => {
      let obj = {}
      obj.department = item.department
      obj.courses = []
      item.courses.forEach(item2 => {
        if (item2.date && item2.session) {
          obj.courses.push(item2)
        }
      })
      console.log(obj)
      this.selectedCourse.push(obj)
    })
  },
  methods: {
    // getDates () {

    // },
    add (event, date, dept, session) {
      console.log('ADD')
      console.log(event)
      if (this.final.length !== 0) {
        this.final.forEach(item => {
          const courses = item.courses
          if (item.department === dept) {
            event.forEach(e => {
              let f = 0
              courses.forEach(course => {
                if (e === course.name) {
                  course.date = date
                  course.session = session
                  f = 1
                }
              })
              if (f !== 1) {
                courses.push({
                  name: e,
                  date,
                  session
                })
              }
            })
          } else {
            event.forEach(e => {
              let obj = {}
              obj.department = dept
              obj.courses = []
              let obj2 = {}
              obj2.name = e
              obj2.date = date
              obj2.session = session
              obj.courses.push(obj2)
              this.final.push(obj)
            })
          }
        })
      } else {
        event.forEach(e => {
          let obj = {}
          obj.department = dept
          obj.courses = []
          let obj2 = {}
          obj2.name = e
          obj2.date = date
          obj2.session = session
          obj.courses.push(obj2)
          this.final.push(obj)
        })
      }
      console.log(this.final)
    },
    allowedDates (val) {
      return val >= this.date
    },
    totalDates (start, end) {
      this.items = []
      this.$refs.menu.save(this.toDate)
      let a = new Date(start)
      let b = new Date(end)
      while (a <= b) {
        let obj = {}
        obj.date = `${a.getDate()}-${a.getMonth() + 1}-${a.getFullYear()}`
        a.setDate(a.getDate() + 1)
        this.items.push(obj)
      }
    }
  },
  computed: {
    department () {
      let coursesPerDepartment = this.course
      let department = [
        {
          text: 'Dates',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        {
          text: 'Sessions',
          sortable: false,
          value: 'sessions'
        }
      ]
      coursesPerDepartment.forEach(obj => {
        department.push({
          text: obj.department,
          value: obj.department,
          sortable: false
        })
      })
      return department
    }
  }
}
</script>
