<script lang="ts">
import { z } from 'zod'

export const numberInputSchema = z.literal('number').or(
  z.object({
    kind: z.literal('enum'),
    type: z.string().refine((type) => {
      return type.split('|').some(t => t.trim() === 'number')
    })
  })
)

export type NumberInputSchema = z.infer<typeof numberInputSchema>
</script>

<script setup lang="ts">
const modelValue = defineModel<number>()
</script>

<template>
  <UInput v-model.number="modelValue" type="number" class="min-w-54" />
</template>
