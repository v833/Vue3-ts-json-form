import { defineComponent, PropType, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine, SelectionWidgetDefine } from '../types'
const Selection: SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
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

export default Selection
