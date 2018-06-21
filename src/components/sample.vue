<template>
  <div>
    <h2>
      hello {{ name }}
    </h2>
    <p>{{ count }}</p>
    <input type="text" name="text" id="text" v-model="input">
    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  name: 'sample',
  data () {
    return {
      name: 'theja',
      count: 0,
      input: 'baibhab'
    }
  },
  methods: {
    addMethod () {
      return this.count
    },
    add () {
      this.count++
    }
  },
  computed: {
    addComputed () {
      return this.count
    }
  }
}
</script>