<script lang="ts">
import { z } from 'zod'

export const stringEnumInputSchema = z.object({
  kind: z.literal('enum'),
  type: z.string().transform<string[]>(t => t.split('|')
    .filter(t => t.trim().match(/^["'`]/))
    .map(t => t.trim().replaceAll(/["'`]/g, ''))
  ).pipe(z.array(z.string()).min(1))
})

export type StringEnumInputSchema = z.infer<typeof stringEnumInputSchema>
</script>

<script setup lang="ts">
defineProps<{
  schema: StringEnumInputSchema
}>()
</script>

<template>
  <USelectMenu :items="schema.type" class="min-w-52" />
</template>
