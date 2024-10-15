<script setup lang="ts">
import type { PropertyMeta } from 'vue-component-meta'

const props = defineProps<Partial<PropertyMeta>>()
const modelValue = defineModel<any>()

const matchedInput = ref()
const parsedSchema = ref()

const { resolveInputSchema } = usePropSchema()

watchEffect(() => {
  if (!props.schema) return
  const result = resolveInputSchema(props.schema)
  parsedSchema.value = result?.schema
  matchedInput.value = result?.input
})
</script>

<template>
  <UFormField :name="name" class="" :ui="{ wrapper: 'mb-2' }" :class="{ 'opacity-70 cursor-not-allowed': !matchedInput }">
    <template #label>
      <p v-if="name" class="font-mono font-bold px-1.5 py-0.5 border-neutral-200 dark:border-neutral-500 dark:text-neutral-100 border border-dashed rounded bg-neutral-50 dark:bg-neutral-700">
        {{ name }}
      </p>
    </template>

    <template #description>
      <MDC v-if="description" :value="description" class="text-neutral-600 dark:text-neutral-400 mt-1" />
    </template>

    <component :is="matchedInput.component" v-if="matchedInput" v-model="modelValue" :schema="parsedSchema" />
  </UFormField>
</template>
