import { defineComponent, PropType, provide, reactive, ref } from 'vue'
import { Schema, SchemaTypes, FieldPropsDefine, Theme } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'
export default defineComponent({
  name: 'SchemaForm',
  props: {
    ...FieldPropsDefine
    // theme: { type: Object as PropType<Theme>, required: true }
  },
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    const context: any = {
      SchemaItem
      // theme: props.theme
    }
    provide(SchemaFormContextKey, context)
    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      )
    }
  }
})
