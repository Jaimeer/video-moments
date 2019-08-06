<template>
  <v-layout row wrap>
    <v-flex class="xs12">
      <v-card>
        <v-card-title>Event Mod</v-card-title>
        <v-card-text>
          <div>
            <v-text-field v-model="email" label="Email" type="text" />
          </div>
          <div>
            <v-text-field v-model="password" label="Password" type="password" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { login } from '../../../parameters'
const debug = require('debug')('APP:Component:Login')

export default {
  components: {},
  data: () => {
    return {
      email: '',
      password: '',
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      this.email = login.email
      this.password = login.password
    }
  },
  methods: {
    login() {
      debug('login')
      debug(process.env.NODE_ENV)
      this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>
