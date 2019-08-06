<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Video</span> -
      <span class="font-weight-light">MOMENTS</span>
    </v-toolbar-title>
    <template v-if="currentUser">
      <v-spacer></v-spacer>
      <span class="mr-2">{{currentUser.email}}</span>
      <v-btn @click="logout">
        <span class="mr-2">logout</span>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
    },
  },
}
</script>