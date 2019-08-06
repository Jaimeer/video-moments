<template>
  <div>
    <EventList :events="events" @refresh="getData" />
  </div>
</template>

<script>
import { getEvents } from '@/lib/data'
import EventList from '@/components/event/EventList'

export default {
  components: { EventList },
  data: () => {
    return {
      events: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.events = await getEvents()
    },
  },
}
</script>
