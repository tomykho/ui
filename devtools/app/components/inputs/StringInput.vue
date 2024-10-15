<script lang="ts">
import { z } from 'zod'

export const stringInputSchema = z.literal('string').or(
  z.object({
    kind: z.literal('enum'),
    type: z.string().refine((type) => {
      return type.split('|').some(t => t.trim() === 'string')
    })
  })
)

export type StringInputSchema = z.infer<typeof stringInputSchema>
</script>

<script setup lang="ts">
</script>

<template>
  <UInput class="min-w-54" />
</template>
