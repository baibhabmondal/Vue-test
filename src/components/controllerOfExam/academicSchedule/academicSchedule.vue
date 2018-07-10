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
            <v-btn flat color="primary" @click="$refs.menu.save(toDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4 mb-4" justify-center>
      <v-data-table :headers="department" :items="items" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <!-- <tr>
            <td>
              13-12-2018
            </td>
            <td>
              afternoon
            </td>
            <td>
              <v-select :items="['ada','csa']"></v-select>
            </td>
            <td>
              <v-select :items="['ada','csa']"></v-select>
            </td>
            <td>
              <v-select :items="['ada','csa']"></v-select>
            </td>
            <td>
              <v-select :items="['ada','csa']"></v-select>
            </td>
          </tr> -->
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
            <v-select full-width :items="item.courses" item-text="name" style="padding: 0;"></v-select>
          </v-flex>
            <v-flex>
            <v-select full-width :items="item.courses" item-text="name" style="padding: 0;"></v-select>
          </v-flex>
          </v-layout>
          </td>
          <!-- <td class="text-xs-right"><v-select :items="['ada','csa']"></v-select></td> -->
          <!-- <td class="text-xs-right">{{ props.item.fat }}</td> -->
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
      date: null,
      menu: false,
      toDate: null,
      course: [],
      desserts: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        }
      ]
    }
  },
  async created () {
    this.date = '2018-06-29'
    const response = await axios.get('http://localhost:3000/courses')
    this.course = response.data
    // console.log(response.data)
  },
  methods: {
    courseNames () {
      console.log('courseName called')
    },
    allowedDates (val) {
      return val >= this.date
    }
  },
  computed: {
    items () {
      let items = []
      let courses = this.course
      for (let i = 0; i < 5; i++) {
        let obj = {}
        courses.forEach(item => {
          obj.date = '13-12-2018'
          obj[courses.department] = 'ADA'
        })
        items.push(obj)
      }
      return items
    },
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
