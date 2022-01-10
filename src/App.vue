<template>
  <Main :age="5"></Main>
</template>

<script lang="ts">
import Main from './components/Main.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Main
  },
  mounted() {}
})
</script>

<style></style>
