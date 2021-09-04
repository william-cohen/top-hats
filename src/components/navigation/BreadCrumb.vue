<script lang="ts">
import { defineComponent } from 'vue'

import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

export default defineComponent({
  name: 'BreadCrumb',

  props: {},

  components: {
    NBreadcrumb,
    NBreadcrumbItem
  }
})
</script>
<template>
  <n-breadcrumb>
    <n-breadcrumb-item> Products </n-breadcrumb-item>
    <n-breadcrumb-item> All </n-breadcrumb-item>
  </n-breadcrumb>
</template>
