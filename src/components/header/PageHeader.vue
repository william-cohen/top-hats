<script lang="ts">
import { defineComponent } from 'vue'

import { NSpace, NPageHeader, NAvatar, NMenu } from 'naive-ui'
import HatIcon from '../icon/HatIcon.vue'

export default defineComponent({
  name: 'PageHeaderrr',

  // props: {},

  components: {
    NSpace,
    NPageHeader,
    NAvatar,
    NMenu,
    HatIcon
  }

  // setup(props) {}
})
</script>
<template>
  <n-space style="padding: 16px">
    <n-page-header
      bordered
      class="nav"
      subtitle="For the distinguished gentleperson"
    >
      <template #title>
        <a style="text-decoration: none; color: inherit"> Top hats </a>
      </template>
      <template #avatar>
        <n-avatar>
          <hat-icon />
        </n-avatar>
      </template>
    </n-page-header>
    <n-menu
      mode="horizontal"
      :indent="18"
      :options="[
        {
          label: 'Home',
          key: 'home'
        }
      ]"
    />
  </n-space>
</template>
