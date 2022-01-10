<template>
  <div>{{ age }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core'
const PropsType = {
  age: {
    type: Number,
    required: true
  },
  msg: String
} as const
export default defineComponent({
  name: 'Main',
  props: PropsType,
  mounted() {
    this.age
  }
})
</script>

<style></style>
