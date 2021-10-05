<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { NForm, NH3, NH6, NRadioGroup, NRadioButton, NSlider } from 'naive-ui'

export interface FilterOptions {
  sortBy: 'title' | 'price' | 'none'
  priceRange: [number, number]
}

export default defineComponent({
  name: 'ProductFilters',

  props: {
    modelValue: {
      required: true,
      type: Object as PropType<FilterOptions>
    }
  },

  emits: {
    'update:modelValue': (m: FilterOptions) => !!m
  },

  components: {
    NForm,
    NH3,
    NH6,
    NRadioGroup,
    NRadioButton,
    NSlider
  },

  setup(props, context) {
    const filters = computed({
      get() {
        return props.modelValue
      },
      set(newModel: FilterOptions) {
        context.emit('update:modelValue', newModel)
      }
    })

    return {
      filters
    }
  }
})
</script>
<template>
  <n-form :model="filters">
    <n-h3>Filters</n-h3>
    <n-h6>Sort by</n-h6>
    <n-radio-group v-model:value="filters.sortBy" name="radiobuttongroup1">
      <n-radio-button value="none"> None </n-radio-button>
      <n-radio-button value="title"> Title </n-radio-button>
      <n-radio-button value="price"> Price </n-radio-button>
    </n-radio-group>
    <n-h6>Price</n-h6>
    <n-slider
      v-model:value="filters.priceRange"
      range
      :min="10"
      :max="3300"
      :marks="{
        10: 'Poverty',
        1250: 'Modesty',
        3000: 'Distinguished'
      }"
      :step="10"
    />
  </n-form>
</template>
