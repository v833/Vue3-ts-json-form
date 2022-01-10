<template>
  <Main :age="5"></Main>
  <div>{{ name }}</div>
  <div>{{ computedName }}</div>
</template>

<script lang="ts">
import Main from './components/Main.vue'
import { defineComponent, ref, computed, watchEffect } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    Main
  },
  setup(props, { slots, attrs, emit }) {
    const name = ref('Stvfen')
    const computedName = computed(() => {
      return name.value + 2
    })
    // 里面所引用到的属性变化时，重新执行
    watchEffect(() => {
      console.log(name.value)
    })
    return {
      name,
      computedName
    }
  },
  mounted() {}
})
</script>

<style></style>
