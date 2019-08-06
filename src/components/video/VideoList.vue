<template>
  <div>
    <h1 class="title">VideoList</h1>
    <v-layout row wrap v-if="videos.length>0">
      <v-flex v-for="video in videos" :key="video._key" class="xs4 pa-3">
        <VideoCard :video="video" @deleted="refresh" @modified="refresh" />
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else class="pl-3 my-4">No videos</v-layout>
    <v-layout v-if="currentUser" row class="mt-3">
      <v-flex class="xs12">
        <VideoMod :event-key="eventKey" @modified="refresh" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoCard from './VideoCard'
import VideoMod from './VideoMod'
const debug = require('debug')('APP:Component:VideoList')

export default {
  components: { VideoCard, VideoMod },
  props: {
    eventKey: {
      type: String,
      required: true,
    },
    videos: {
      type: Array,
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
      debug('refresh')
      this.$emit('refresh')
    },
  },
}
</script>
