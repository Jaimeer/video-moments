<template>
  <div>
    <VideoItem v-if="video" :video="video" @needRefresh="getData" />
    <router-link class="mt-5" :to="{name:'videos'}">Go to Videos</router-link>
  </div>
</template>

<script>
import { getVideo } from '@/lib/data'
import VideoItem from '@/components/video/VideoItem'

export default {
  components: { VideoItem },
  props: {
    videoKey: {
      type: String,
      default: null,
    },
  },
  data: () => {
    return {
      video: null,
    }
  },
  watch: {
    videoKey() {
      this.getData()
    },
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.video = await getVideo(this.videoKey)
    },
  },
}
</script>
