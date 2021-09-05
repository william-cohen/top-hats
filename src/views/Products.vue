<script lang="ts">
import { defineComponent } from 'vue'

import { NLayout, NLayoutHeader, NCard } from 'naive-ui'

import BreadCrumb from '@/components/navigation/BreadCrumb.vue'

export default defineComponent({
  name: 'Products',

  props: {},

  components: {
    NLayout,
    NLayoutHeader,
    NCard,
    BreadCrumb
  }

  // setup(props) {}
})
</script>
<template>
  <n-card>
    <n-layout embedded>
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <bread-crumb />
      </n-layout-header>
    </n-layout>
    <router-view />
  </n-card>
</template>
