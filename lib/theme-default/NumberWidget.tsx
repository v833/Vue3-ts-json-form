import { defineComponent, nextTick } from 'vue'
import { CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'

const TextWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      e.target.value = props.value
      props.onChange(e.target.value)
    }
    return () => {
      return <input type="number" value={props.value} onInput={handleChange} />
    }
  }
})

export default TextWidget
