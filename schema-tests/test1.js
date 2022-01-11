// Node.js require:
var Ajv = require('ajv')
const localize = require("ajv-i18n")
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      // format: 'test',
      test: true,
      minLength: 2
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    isWorker: {
      type: 'boolean'
    },
  },
  required: ['age']

}

var ajv = new Ajv()
// ajv.addFormat('test', (data) => {
//   console.log(data);
//   return data === 'hahaha'
// })
ajv.addKeyword('test', {
  validate: function fun(schema, data) {
    fun.errors = [{
      keyword: 'test',
      dataPath: '.username',
      schemaPath: '#/properties/username/test',
      params: {
        keyword: 'test'
      },
      message: 'hello test'
    }]
    return false
  }
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema);
  //   return () => true
  // },
  // metaSchema: { // 校验keyword的值
  //   type: 'boolean'
  // }
  // macro() {
  //   return {
  //     minLength: 10
  //   }
  // }
})
var validate = ajv.compile(schema)
var valid = validate({
  username: 'hahaha',
  age: "24"
})
if (!valid) {
  // ru for Russian
  // localize.zh(validate.errors)
  // string with all errors and data paths
  // console.log(ajv.errorsText(validate.errors, {
  //   separator: '\n'
  // }))
  console.log(validate.errors);
}