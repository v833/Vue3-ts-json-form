import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StringField',
  setup(props, { slots, emit, attrs }) {
    return () => {
      return <div>This is String Form</div>
    }
  }
})
