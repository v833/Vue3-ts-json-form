export default {
  name: 'Demo',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      age: {
        type: 'number'
      }
    }
  },
  uiSchema: {},
  default: {
    name: 'wq',
    age: 18
  }
}
