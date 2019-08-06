<template>
  <div>
    <h1>EventList</h1>
    <v-layout row wrap>
      <v-flex v-for="event in events" :key="event._key" class="xs4 pa-3">
        <EventCard :event="event" />
      </v-flex>
    </v-layout>
    <v-layout v-if="currentUser" row class="mt-5">
      <v-flex class="xs12">
        <EventMod @modified="refresh" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventCard from './EventCard'
import EventMod from './EventMod'
const debug = require('debug')('APP:Component:VideoCard')

export default {
  components: { EventCard, EventMod },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser,
    }),
  },
  methods: {
    refresh() {
      debug('refresh')
      this.$emit('refresh')
    },
  },
}
</script>
