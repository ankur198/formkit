import { FormKitNode } from '@formkit/core'
import { FormKitSchemaNode, FormKitSchemaCondition } from '@formkit/schema'
import { h, defineComponent, InjectionKey, PropType } from 'vue'
import { useInput } from './composables/useInput'
import { useLibrary } from './composables/useLibrary'
import { FormKitSchema } from './FormKitSchema'

/**
 * The symbol that represents the formkit parent injection value.
 */
export const parentSymbol: InjectionKey<FormKitNode> = Symbol('FormKitParent')

/**
 * The root FormKit component.
 * @public
 */
const FormKit = defineComponent({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: false,
    },
    errors: {
      type: Array as PropType<string[]>,
      default: [],
    },
    schema: {
      type: Object as PropType<
        Record<string, Partial<FormKitSchemaNode> | FormKitSchemaCondition>
      >,
      default: {},
    },
    modelValue: {
      required: false,
    },
  },
  emits: ['value', 'update:modelValue'],
  inheritAttrs: false,
  setup(props, context) {
    const libInput = useLibrary(props.type)
    const schema =
      typeof libInput.schema === 'function'
        ? libInput.schema(props.schema)
        : libInput.schema
    const [data] = useInput(libInput, props, context)
    return () => h(FormKitSchema, { schema, data }, { ...context.slots })
  },
})

export default FormKit