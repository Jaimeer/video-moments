<template>
  <v-dialog persistent v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-if="!open" color="primary" dark v-on="on">{{buttonText}}</v-btn>
    </template>
    <v-card>
      <v-card-title>Event Mod</v-card-title>
      <v-card-text>
        <div>
          <v-text-field v-model="name" label="Name" type="text" />
        </div>
        <div>
          <v-text-field v-model="description" label="Description" type="text" />
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
import { addEvent, updateEvent } from '@/lib/data'
const debug = require('debug')('APP:Component:EventMod')

export default {
  props: {
    event: {
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
    }
  },
  computed: {
    buttonText() {
      if (this.event) return 'Update Event'
      else return 'Create Event'
    },
  },
  watch: {
    event() {
      this.setValues()
    },
  },
  created() {
    this.setValues()
  },
  methods: {
    setValues() {
      if (this.open) this.dialog = true
      if (this.event) {
        this.name = this.event.name
        this.description = this.event.description
      }
    },
    cleanForm() {
      this.name = ''
      this.description = ''
    },
    async modified() {
      let newItem = null
      const itemFormData = {
        name: this.name,
        description: this.description,
      }
      if (!this.event) {
        newItem = await addEvent(itemFormData)
        this.cleanForm()
      } else {
        const event = {
          ...this.event,
          ...itemFormData,
        }
        newItem = await updateEvent(event)
      }

      debug('emit', 'modified')
      this.dialog = false
      this.$emit('modified', newItem)
    },
    canceled() {
      if (!this.open) this.dialog = false
      this.$emit('canceled')
    },
  },
}
</script>
