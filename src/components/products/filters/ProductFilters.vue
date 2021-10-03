<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

import { NForm, NH3, NH6, NSpace, NTag, NSlider } from 'naive-ui'

export interface FilterOptions {
  category: 'table' | 'sofa' | 'lamp' | 'chair' | ''
  color: 'yellow' | 'blue' | 'white' | 'red' | ''
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
    NTag,
    NSpace,
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

    const setCategory = (newCategory: 'table' | 'sofa' | 'lamp' | 'chair') =>
      (filters.value.category =
        filters.value.category === newCategory ? '' : newCategory)

    const setColor = (newColor: 'yellow' | 'blue' | 'white' | 'red') =>
      (filters.value.color = filters.value.color === newColor ? '' : newColor)

    return {
      filters,
      setCategory,
      setColor
    }
  }
})
</script>
<template>
  <n-form :model="filters">
    <n-h3>Filters</n-h3>
    <n-h6>Category</n-h6>
    <n-space vertical>
      <n-tag
        checkable
        :checked="filters.category === 'table'"
        @click="setCategory('table')"
      >
        Table
      </n-tag>
      <n-tag
        checkable
        :checked="filters.category === 'sofa'"
        @click="setCategory('sofa')"
      >
        Sofa
      </n-tag>
      <n-tag
        checkable
        :checked="filters.category === 'lamp'"
        @click="setCategory('lamp')"
      >
        Lamp
      </n-tag>
      <n-tag
        checkable
        :checked="filters.category === 'chair'"
        @click="setCategory('chair')"
      >
        Chair
      </n-tag>
    </n-space>
    <n-h6>Color</n-h6>
    <n-space>
      <n-tag
        checkable
        :checked="filters.color === 'yellow'"
        @click="setColor('yellow')"
      >
        Yellow
      </n-tag>
      <n-tag
        checkable
        :checked="filters.color === 'blue'"
        @click="setColor('blue')"
      >
        Blue
      </n-tag>
      <n-tag
        checkable
        :checked="filters.color === 'white'"
        @click="setColor('white')"
      >
        White
      </n-tag>
      <n-tag
        type="error"
        checkable
        :checked="filters.color === 'red'"
        @click="setColor('red')"
      >
        Red
      </n-tag>
    </n-space>
    <n-h6>Price</n-h6>
    <n-slider
      v-model:value="filters.priceRange"
      range
      :min="10"
      :max="500"
      :marks="{
        10: 'Poverty',
        200: 'Modesty',
        450: 'Distinguished'
      }"
      :step="10"
    />
  </n-form>
</template>
