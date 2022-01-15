import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (e: any) => {
      const value = e.target.value
      const num = Number(value)
      if (Number.isNaN(num) && num) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    return () => {
      const { value } = props
      return <input type="number" value={value} onInput={handleChange} />
    }
  }
})
