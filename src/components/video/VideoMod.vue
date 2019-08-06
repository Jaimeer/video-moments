<template>
  <v-dialog persistent v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-if="!open" color="primary" dark v-on="on">{{buttonText}}</v-btn>
    </template>
    <v-card>
      <v-card-title>Video Mod</v-card-title>
      <v-card-text>
        <div>
          <v-text-field v-model="name" label="name" type="text" />
        </div>
        <div>
          <v-text-field v-model="description" label="Description" type="text" />
        </div>
        <div>
          <v-file-input
            v-if="!videoInfo"
            label="File input"
            accept="video/*"
            @change="processVideo"
          ></v-file-input>
          <VideoPlayer v-else size="sm" :url="videoInfo.url" />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="modified">{{ buttonText }}</v-btn>
        <v-btn @click="canceled">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VideoPlayer from '../general/VideoPlayer'
import { addVideo, updateVideo, uploadVideo } from '@/lib/data'
const debug = require('debug')('APP:Component:VideoMod')

export default {
  components: { VideoPlayer },
  props: {
    eventKey: {
      type: String,
      required: true,
    },
    video: {
      type: Object,
      default: null,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      dialog: false,
      name: '',
      description: '',
      videoInfo: null,
    }
  },
  computed: {
    buttonText() {
      if (this.video) return 'Update Video'
      else return 'Add Video'
    },
  },
  watch: {
    video() {
      this.setValues()
    },
  },
  created() {
    this.setValues()
  },
  methods: {
    setValues() {
      if (this.open) this.dialog = true
      if (this.video) {
        this.name = this.video.name
        this.description = this.video.description
        this.videoInfo = this.video.videoInfo
      }
    },
    cleanForm() {
      this.name = ''
      this.description = ''
      this.videoInfo = null
    },
    async modified() {
      let newItem = null
      const itemFormData = {
        name: this.name,
        description: this.description,
        videoInfo: this.videoInfo,
      }
      if (!this.video) {
        newItem = await addVideo(this.eventKey, itemFormData)
      } else {
        const video = {
          ...this.video,
          ...itemFormData,
        }
        newItem = await updateVideo(video)
      }
      this.cleanForm()
      this.dialog = false
      debug('emit', 'modified')
      this.$emit('modified', newItem)
    },
    canceled() {
      if (!this.open) this.dialog = false
      this.$emit('canceled')
    },
    async processVideo(file) {
      const videoInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
      }
      debug('processVideo', file, videoInfo)
      const upload = await uploadVideo(file)
      this.videoInfo = { ...videoInfo, ...{ url: upload } }
    },
  },
}
</script>
