import { defineComponent, nextTick } from 'vue'
import { FieldPropsDefine, CommonWidgetNames } from '../types'
import { getWidget } from '../theme'
export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: string) => {
      props.onChange(v)
    }
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
    return () => {
      const { schema, rootSchema, ...rest } = props
      const TestWidget = TextWidgetRef.value
      return <TestWidget {...rest} onChange={handleChange} />
    }
  }
})
