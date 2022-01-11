import { defineComponent, PropType } from '@vue/runtime-core'
const PropsType = {
  age: {
    type: Number as PropType<number>,
    required: true
  },
  msg: String
} as const
export default defineComponent({
  props: PropsType,
  setup(props) {
    return () => {
      return <div>{props.age}</div>
    }
  }
})
