import { defineComponent } from 'vue'
import { FieldPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'
/*
{
  items: {type: string}
} 
{
  items: [
    {type: string},
    {type: number}
  ]
}
{
  items: {type: string, enum: ['1', '2']}
}
 */
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const context = useVJSFContext()
    const handleMutiTypeChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const SchemaItem = context.SchemaItem
      if (Array.isArray(schema.items)) {
        const arr = Array.isArray(value) ? value : []
        const items: Schema[] = schema.items as any
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => handleMutiTypeChange(v, index)}
          />
        ))
      }
      return <div>1</div>
    }
  }
})
