<script lang="ts">
import { defineComponent, VNodeChild, h, computed, Ref } from 'vue'

import { NPageHeader, NAvatar, NMenu, MenuOption } from 'naive-ui'
import HatIcon from '../icon/HatIcon.vue'
import { RouterLink, useRoute } from 'vue-router'

import CartButton from './cart/CartButton.vue'

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
    // NSpace,
    NPageHeader,
    NAvatar,
    NMenu,
    HatIcon,
    CartButton
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
  <div class="nav" style="padding: 16px">
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
    <div class="nav-end">
      <cart-button />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav {
  display: grid;
  align-items: center;
  padding: 0 16px;
  grid-template-columns: calc(411px) 1fr auto;

  .nav-end {
    padding-right: 10px;
  }
}
</style>
