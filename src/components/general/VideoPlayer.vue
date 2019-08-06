<template>
  <video :width="width" :height="height" controls>
    <source :src="url" type="video/mp4" />
  </video>
</template>

<script>
// const debug = require('debug')('APP:Component:VideoPlayer')

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'sm',
    },
  },
  data: () => {
    return {
      sizes: {
        sm: {
          w: 320,
          h: 240,
        },
        md: {
          w: 640,
          h: 480,
        },
      },
    }
  },
  computed: {
    width() {
      return (this.sizes[this.size] || this.sizes['sm']).w
    },
    height() {
      return (this.sizes[this.size] || this.sizes['sm']).h
    },
  },
}
</script>
