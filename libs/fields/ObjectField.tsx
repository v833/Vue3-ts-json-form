import { SchemaFormContextKey, useVJSFContext } from '../context'
import { defineComponent, inject, DefineComponent, ExtractPropTypes } from 'vue'
import { FieldPropsDefine, CommonFieldType } from '../types'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine, // 不是类型,是一个对象，defineComponent会自动将变量识别出类型通过ExtractPropTypes<typeof FieldPropsDefine>获取实际类型
  setup(props, { slots, emit, attrs }) {
    const context = useVJSFContext()
    const handleObjectFieldChange = (key: string, v: any) => {
      const obj: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete obj[key]
      } else {
        obj[key] = v
      }
      props.onChange(obj)
    }
    return () => {
      const { schema, rootSchema, value, onChange } = props
      const { SchemaItem } = context
      const properties: any = schema.properties || []
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaItem
            schema={properties[k]}
            rootSchema={rootSchema}
            value={currentValue[k]}
            key={index}
            onChange={(v: any) => handleObjectFieldChange(k, v)}
          />
        )
      })
    }
  }
})
