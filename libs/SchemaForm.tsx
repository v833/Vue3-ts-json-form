import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes, FieldPropsDefine } from './types'
import SchemaItem from './SchemaItem'
export default defineComponent({
  name: 'SchemaForm',
  props: FieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    return () => {
      const { schema, value } = props
      return (
        <SchemaItem schema={schema} value={value} onChange={handleChange} />
      )
    }
  }
})
