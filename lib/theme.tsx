import {
  computed,
  createSlots,
  defineComponent,
  inject,
  PropType,
  provide,
  Ref
} from 'vue'
import { Theme } from './types'
const THEME_PROVIDE_KEY = Symbol()
const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)
    provide(THEME_PROVIDE_KEY, context)
    return () => slots.default && slots.default()
  }
})
export function getWidget(name: string) {
  const context: Ref<Theme> | undefined = inject<Ref<Theme>>(THEME_PROVIDE_KEY)
  if (!context) {
    throw new Error('vjsf theme required')
  }
  const widgetRef = computed(() => {
    return (context.value.widgets as any)[name]
  })
  return widgetRef
}
export default ThemeProvider
