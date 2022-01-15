import { defineComponent, PropType } from 'vue'
import { FieldPropsDefine, Schema } from '../types'
import { useVJSFContext } from '../context'
import { createUseStyles } from 'vue-jss'
/*
{ // 没有长度限制
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
const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee'
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right'
  },
  action: {
    '& + &': {
      marginLeft: 10
    }
  },
  contain: {
    paddding: 10
  }
})
const ArrayItemWrapper: any = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    const handleAdd = () => {
      props.onAdd(props.index)
    }
    const handleDelete = () => {
      props.onDelete(props.index)
    }
    const handleUp = () => {
      props.onUp(props.index)
    }
    const handleDown = () => {
      props.onDown(props.index)
    }
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={handleAdd}>
              新增
            </button>
            <button class={classes.action} onClick={handleDelete}>
              删除
            </button>
            <button class={classes.action} onClick={handleUp}>
              上移
            </button>
            <button class={classes.action} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes.contain}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  }
})

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const context = useVJSFContext()
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    const handleUp = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === 0) return
      ;[arr[index], arr[index - 1]] = [arr[index - 1], arr[index]]

      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return
      ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      props.onChange(arr)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const SchemaItem = context.SchemaItem
      const isMutiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum
      if (isMutiType) {
        const arr = Array.isArray(value) ? value : []
        const items: Schema[] = schema.items as any
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => handleArrayItemChange(v, index)}
          />
        ))
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                rootSchema={rootSchema}
                value={v}
                key={index}
                onChange={(v: any) => handleArrayItemChange(v, index)}
              />
            </ArrayItemWrapper>
          )
        })
      }
    }
  }
})
