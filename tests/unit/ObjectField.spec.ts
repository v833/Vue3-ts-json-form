import { mount, shallowMount } from '@vue/test-utils'
import JsonSchemaForm, {
  ObjectField,
  StringField,
  NumberField
} from '../../lib'

describe('ObjectField', () => {
  let schema: any = undefined
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
    }
  })
  it('should render properties to correct fields', async () => {
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema,
        value: {},
        onChange: () => ({})
      }
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)
    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })
  it('should change value when sub fields trigger onChange', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)
    await numField.props('onChange')(1)
    expect(value.age).toEqual(1)
    await strField.props('onChange')('1')
    expect(value.name).toEqual('1')
  })
  it('should change value when sub fields trigger onChange (undefined)', async () => {
    let value: any = {
      name: '123'
    }
    const wrapper = mount(JsonSchemaForm as any, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const strField = wrapper.findComponent(StringField)
    await strField.props('onChange')(undefined)
    expect(value.name).toBeUndefined()
  })
})
