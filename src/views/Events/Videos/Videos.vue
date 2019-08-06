<template>
  <div>
    <VideoList :videos="videos" @refresh="getData" />
  </div>
</template>

<script>
import { getVideos } from '@/lib/data'
import VideoList from '@/components/video/VideoList'

export default {
  components: { VideoList },
  data: () => {
    return {
      videos: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.videos = await getVideos()
    },
  },
}
</script>
