export default {
  state: {
    course: [
      {
        department: 'CSE',
        courses: [
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          }
        ]
      },
      {
        department: 'IT',
        courses: [
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          }
        ]
      },
      {
        department: 'ECE',
        courses: [
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          }
        ]
      },
      {
        department: 'SWE',
        courses: [
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          },
          {
            code: '12AD12',
            name: 'Algorithms',
            date: null,
            session: null
          }
        ]
      }
    ]
  },
  getters: {
    course (state) {
      return state.course
    }
  }
}
