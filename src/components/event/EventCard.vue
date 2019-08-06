<template>
  <v-card @click="navigate">
    <v-card-title>{{ event.name }} - {{ event.description }}</v-card-title>
  </v-card>
</template>

<script>
// const debug = require('debug')('APP:Component:EventCard')

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    navigate() {
      this.$router.push({ name: 'event', params: { eventKey: this.event._key } })
    },
  },
}
</script>