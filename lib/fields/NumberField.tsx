import { defineComponent, nextTick } from 'vue'
import { FieldPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'
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
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    return () => {
      const { schema, rootSchema, ...rest } = props
      const NumberWidget = NumberWidgetRef.value
      return <NumberWidget {...rest} onChange={handleChange} />
    }
  }
})
