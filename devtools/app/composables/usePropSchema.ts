import type { PropertyMeta } from 'vue-component-meta'
import { default as BooleanInput, booleanInputSchema } from '../components/inputs/BooleanInput.vue'
import { default as StringInput, stringInputSchema } from '../components/inputs/StringInput.vue'
import { default as NumberInput, numberInputSchema } from '../components/inputs/NumberInput.vue'
import { default as StringEnumInput, stringEnumInputSchema } from '../components/inputs/StringEnumInput.vue'
import { default as ObjectInput, objectInputSchema } from '../components/inputs/ObjectInput.vue'
// import { default as ArrayInput, arrayInputSchema } from '../components/inputs/ArrayInput.vue'

// List of available inputs.
const availableInputs = [
  { schema: stringInputSchema, component: StringInput },
  { schema: numberInputSchema, component: NumberInput },
  { schema: booleanInputSchema, component: BooleanInput },
  { schema: stringEnumInputSchema, component: StringEnumInput },
  { schema: objectInputSchema, component: ObjectInput }
  // { schema: arrayInputSchema, component: ArrayInput },
]

export function usePropSchema() {
  function resolveInputSchema(schema: PropertyMeta['schema']): { schema: PropertyMeta['schema'], input: any } | undefined {
    for (const input of availableInputs) {
      const result = input.schema.safeParse(schema)
      if (result.success) {
        return { schema: result.data as PropertyMeta['schema'], input }
      }
    }

    // TODO: Handle arrays
    // if (typeof schema === 'string') return
    // This is a hack because the Array is returned as an Object instead of a real array.
    // Should check for origin in `nuxt-component-meta`.
    // if (Array.isArray(schema.schema)) {
    //   for (const s of schema.schema) {
    //     const result = resolveInputSchema(s)
    //     if (result) return result
    //   }
    // } else if (typeof schema.schema === 'object' && schema.schema?.[0]) {
    //   for (const s of Object.values(schema.schema)) {
    //     if (!s.schema) continue
    //     const result = resolveInputSchema(s?.schema?.[0])
    //     if (result) return result
    //   }
    // }
  }

  return { resolveInputSchema }
}
