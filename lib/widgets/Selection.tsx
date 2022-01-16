import { defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    },
    options: {
      type: Array as PropType<
        {
          key: string
          value: any
        }[]
      >,
      required: true
    }
  },
  setup(props, { slots, emit, attrs }) {
    const currentValueRef = ref(props.value)
    watch(currentValueRef, (newv) => {
      if (newv !== props.value) {
        props.onChange(newv)
      }
    })
    watch(
      () => props.value,
      (newv) => {
        if (newv !== currentValueRef.value) {
          currentValueRef.value = newv
        }
      }
    )

    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {options.map((op) => (
            <option value={op.value}>{op.key}</option>
          ))}
        </select>
      )
    }
  }
})
