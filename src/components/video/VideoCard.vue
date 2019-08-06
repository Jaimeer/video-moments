<template>
  <v-card>
    <v-card-title>
      {{ video.name }}
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
          <v-list-item @click="removeVideo()">
            <v-list-item-title>Remove</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>{{ video.description }}</v-card-text>
    <v-card-text>
      <VideoPlayer v-if="videoUrl" size="sm" :url="videoUrl" />
      <span v-else>Error loading Video</span>
    </v-card-text>
    <VideoMod
      v-if="editMode && currentUser"
      :event-key="video.event"
      :video="video"
      :open="true"
      @modified="modified"
      @canceled="editMode=false"
    />
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import VideoPlayer from '../general/VideoPlayer'
import VideoMod from './VideoMod'
import { deleteVideo } from '@/lib/data'
import { get } from 'lodash'
import { debuglog } from 'util'
const debug = require('debug')('APP:Component:VideoCard')

export default {
  components: { VideoPlayer, VideoMod },
  props: {
    video: {
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
    videoUrl() {
      return get(this.video, 'videoInfo.url') || null
    },
  },
  methods: {
    editVideo() {
      debug('editVideo')
    },
    async removeVideo() {
      debug('removeVideo')
      await deleteVideo(this.video._key)
      this.$emit('deleted')
    },
    modified() {
      this.editMode = false
      debug('modified')
      this.$emit('modified')
    },
  },
}
</script>
