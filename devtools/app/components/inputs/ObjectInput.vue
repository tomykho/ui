<script lang="ts">
import type { PropertyMeta } from 'vue-component-meta'
import { z } from 'zod'

export const objectInputSchema = z.object({
  kind: z.literal('object'),
  schema: z.record(z.string(), z.object({}))
})

export type ObjectInputSchema = z.infer<typeof objectInputSchema>
</script>

<script setup lang="ts">
defineProps<{
  schema: ObjectInputSchema
}>()

const modelValue = defineModel<Record<string, any>>({})
</script>

<template>
  <CollapseContainer>
    <ComponentPropInput
      v-for="attr in Object.values(schema)"
      class="border-b last:border-b-0 border-[--ui-border] p-4"
      :model-value="modelValue?.[(attr as any).name]"
      v-bind="attr as any"
      @update:model-value="(value: any) => {
        if (!modelValue) modelValue ||= {}
        else modelValue[(attr as any).name] = value
      }"
    />
  </CollapseContainer>
</template>
