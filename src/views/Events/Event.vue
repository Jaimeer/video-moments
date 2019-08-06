<template>
  <v-layout wrap row>
    <v-flex class="xs12">
      <EventItem v-if="event" :event="event" @refresh="getData" />
    </v-flex>
    <v-flex class="xs12 mt-5">
      <router-link :to="{name:'events'}">Go to Events</router-link>
    </v-flex>
  </v-layout>
</template>

<script>
import { getEvent, getVideos } from '@/lib/data'
import EventItem from '@/components/event/EventItem'

export default {
  components: { EventItem },
  props: {
    eventKey: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      event: null,
    }
  },
  created() {
    this.getData()
  },
  watch: {
    eventKey() {
      this.getData()
    },
  },
  methods: {
    async getData() {
      this.event = await getEvent(this.eventKey)
    },
  },
}
</script>
