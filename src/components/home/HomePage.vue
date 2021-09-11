<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import {
  NImageGroup,
  NImage,
  NSpace,
  NH1,
  NH2,
  NDivider,
  NButton
} from 'naive-ui'

export default defineComponent({
  name: 'HomePage',

  components: { NImageGroup, NImage, NSpace, NH1, NH2, NDivider, NButton },

  setup() {
    const router = useRouter()
    const navigateproducts = () => {
      router.push('products')
    }

    const images = [
      {
        text: 'For the many',
        src: require('@/assets/cover/cover2.jpeg')
      },
      {
        text: 'For the brave',
        src: require('@/assets/cover/cover1.jpeg')
      },
      {
        text: 'For the best',
        src: require('@/assets/cover/cover4.jpeg')
      }
    ] as { text: string; src: string }[]

    return {
      navigateproducts,
      images
    }
  }
})
</script>
<template>
  <n-h1>Find your groove, purchase a hat</n-h1>
  <n-image-group :show-toolbar="false">
    <n-space justify="center">
      <n-space vertical v-for="image in images" :key="image.text">
        <n-image :src="image.src" show-toolbar="false" height="500" />
        <n-h2>{{ image.text }}</n-h2>
      </n-space>
    </n-space>
  </n-image-group>

  <n-space justify="center">
    <n-divider />
    <n-button
      class="lets go"
      type="primary"
      size="large"
      @click="navigateproducts"
    >
      Let's go
    </n-button>
  </n-space>
</template>
<style lang="scss" scoped>
.lets.go {
  margin-top: 48px;
  margin-bottom: 48px;
  width: 330px;
}
</style>
