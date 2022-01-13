import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes, FieldPropsDefine } from './types'
// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField'
export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props, { slots }) {
    return () => {
      const { schema } = props
      // TODO: 如果type没有指定，我们需要猜测这个type
      const type = (schema as any).type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.log('${type} is not supported')
        }
      }
      return <Component {...props} />
    }
  }
})
