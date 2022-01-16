import { mount, shallowMount } from '@vue/test-utils'
import JsonSchemaForm, { NumberField, StringField } from '../../libs'

describe('JsonSchemaForm', () => {
  it('should render correct number field', async () => {
    let value = 5
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'number'
        },
        value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()
    // await numberField.props('onChange')('123')
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
  it('should render corret string field', async () => {
    let value = 'str'
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema: {
          type: 'string'
        },
        value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const stringField = wrapper.findComponent(StringField)
    expect(stringField.exists()).toBeTruthy()
    const input = stringField.find('input')
    input.element.value = 'set string'
    input.trigger('input')
    expect(value).toBe('set string')
  })
})
