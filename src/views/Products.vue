<script lang="ts">
import { defineComponent } from 'vue'

import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NH1,
  NLayoutFooter,
  NSpace
} from 'naive-ui'

import BrowseProducts from '@/components/products/BrowseProducts.vue'
import PageHeader from '@/components/header/PageHeader.vue'

export default defineComponent({
  name: 'Products',

  props: {},

  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    // NH1,
    NSpace,
    BrowseProducts,
    PageHeader
  }

  // setup(props) {}
})
</script>
<template>
  <n-layout position="absolute">
    <n-layout-header bordered>
      <page-header />
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;" class="bg">
      <div class="container">
        <browse-products />
      </div>
    </n-layout-content>
    <n-layout-footer position="absolute" bordered>
      <n-space justify="center">Genertic Footer</n-space>
    </n-layout-footer>
  </n-layout>
</template>
<style lang="scss" scoped>
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 80px;
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
}

.bg {
  background-color: #fff1e7;
}
</style>
