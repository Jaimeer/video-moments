<template>
  <v-app>
    <Header />
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/general/Header'
export default {
  name: 'App',
  components: { Header },
  data: () => ({}),
  created() {
    this.$store.dispatch('user/autoLogin')
  },
}
</script>
