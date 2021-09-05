<script lang="ts">
import { defineComponent, VNodeChild, h, computed, Ref } from 'vue'

import { NSpace, NPageHeader, NAvatar, NMenu, MenuOption } from 'naive-ui'
import HatIcon from '../icon/HatIcon.vue'
import { RouterLink, useRoute } from 'vue-router'

const renderRouterLink =
  (name: string): (() => VNodeChild) =>
  () =>
    h(
      RouterLink,
      {
        to: { name: name }
      },
      () => name
    )

export default defineComponent({
  name: 'PageHeader',

  // props: {},

  components: {
    NSpace,
    NPageHeader,
    NAvatar,
    NMenu,
    HatIcon
  },

  setup(props) {
    const route = useRoute()

    console.log(route)

    const renderNavOption = (key: string, label: string): MenuOption => ({
      label: renderRouterLink(label),
      key: key,
      disabled: route.name === label
    })

    const navOptions: Readonly<Ref<MenuOption[]>> = computed(() => [
      renderNavOption('home', 'Home'),
      renderNavOption('products', 'Products')
    ])

    return {
      navOptions
    }
  }
})
</script>
<template>
  <n-space class="nav" style="padding: 16px">
    <n-page-header bordered subtitle="For the distinguished gentleperson">
      <template #title>
        <a style="text-decoration: none; color: inherit"> Top hats </a>
      </template>
      <template #avatar>
        <n-avatar>
          <hat-icon />
        </n-avatar>
      </template>
    </n-page-header>
    <n-menu mode="horizontal" :indent="18" :options="navOptions" />
  </n-space>
</template>
<style lang="scss" scoped>
.nav {
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}
</style>
