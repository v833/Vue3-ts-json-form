import { defineComponent } from 'vue'
import JsonSchemaForm, { ThemeProvider } from '../../../lib'
import { Schema, SchemaTypes, FieldPropsDefine } from '../../../lib/types'
import defaultTheme from '../../../lib/theme-default'

export default defineComponent({
  name: 'TestComponent',
  props: FieldPropsDefine,
  setup(props) {
    return () => (
      <ThemeProvider theme={defaultTheme}>
        <JsonSchemaForm {...props} />
      </ThemeProvider>
    )
  }
})
