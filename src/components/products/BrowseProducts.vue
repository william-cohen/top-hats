<script lang="ts">
import { defineComponent } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutFooter,
  NSkeleton,
  NCard,
  NBreadcrumb,
  NBreadcrumbItem
} from 'naive-ui'

export default defineComponent({
  name: 'BrowseProducts',

  props: {},

  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    // NLayoutFooter,
    NSkeleton,
    NCard,
    NBreadcrumb,
    NBreadcrumbItem
  }

  // setup(props) {}
})
</script>
<template>
  <n-card>
    <n-layout embedded>
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <n-breadcrumb>
          <n-breadcrumb-item> Products </n-breadcrumb-item>
          <n-breadcrumb-item> All </n-breadcrumb-item>
        </n-breadcrumb>
      </n-layout-header>
      <n-layout has-sider embedded>
        <n-layout-sider bordered content-style="padding: 24px;">
          Filters and such
        </n-layout-sider>
        <n-layout content-style="padding: 24px;">
          <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 60%" />
        </n-layout>
      </n-layout>
    </n-layout>
  </n-card>
</template>
