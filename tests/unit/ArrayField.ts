import { mount, shallowMount } from '@vue/test-utils'
import JsonSchemaForm, {
  NumberField,
  StringField,
  ArrayField,
  SelectionWidget
} from '../../libs'

describe('ArrayField', () => {
  it('should render multi type', async () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string'
            },
            {
              type: 'number'
            }
          ]
        },
        value: [],
        onChange: () => {}
      }
    })
    const arr = wrapper.findComponent(ArrayField)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)
    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })
  it('should render select type', async () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string', enum: ['1', '2', '3'] }
        },
        value: [],
        onChange: () => {}
      }
    })
    const arr = wrapper.findComponent(ArrayField)
    const select = arr.findComponent(SelectionWidget)
    expect(select.exists).toBeTruthy()
  })
  it('should render single type', async () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string' }
        },
        value: ['1', '2'],
        onChange: () => {}
      }
    })
    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)
    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe(1)
  })
})
