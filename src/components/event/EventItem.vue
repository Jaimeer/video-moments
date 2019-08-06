<template>
  <div>
    <v-card>
      <v-card-title>
        {{ event.name }}
        <v-spacer></v-spacer>
        <v-menu v-if="currentUser" bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="editMode=true">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="removeEvent()">
              <v-list-item-title>Remove</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <div>
          <b>Description</b>
          {{ event.description }}
        </div>
        <div>
          <VideoList
            :event-key="event._key"
            :videos="event.videos"
            class="mt-5"
            @refresh="refresh"
          />
        </div>
      </v-card-text>
    </v-card>
    <EventMod
      v-if="editMode && currentUser"
      :open="true"
      :event="event"
      @modified="refresh"
      @canceled="editMode=false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventMod from '@/components/event/EventMod'
import VideoList from '@/components/video/VideoList'
import { deleteEvent } from '@/lib/data'
// const debug = require('debug')('APP:Component:EventItem')

export default {
  components: { EventMod, VideoList },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      editMode: false,
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser,
    }),
  },
  methods: {
    refresh() {
      this.editMode = false
      this.$emit('refresh')
    },
    async removeEvent() {
      await deleteEvent(this.event._key)
      this.$router.push({ name: 'events' })
    },
  },
}
</script>