import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberField',
  setup(props, { slots, emit, attrs }) {
    return () => {
      return <div>This is Number Form</div>
    }
  }
})
