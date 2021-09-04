<script lang="ts">
import { defineComponent } from 'vue'

import { NIcon } from 'naive-ui'
export default defineComponent({
  name: 'HatIcon',

  components: {
    NIcon
  }
})
</script>
<template>
  <n-icon size="40">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="1200"
      height="1200"
      viewBox="0 0 1200 1200"
    >
      <rect width="100%" height="100%" fill="#FFFFFF"></rect>
      <g
        transform="translate(600 600) scale(0.69 0.69) rotate(0) translate(-600 -600)"
        style="fill: #000000"
      >
        <svg
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          style="enable-background: new 0 0 100 100"
          xml:space="preserve"
        >
          <g>
            <path
              d="M49.9999695,62.8742676c15.4946899,0,28.055603-2.6317139,28.055603-8.0947266l1-32.3248901   c0-5.4629517-13.5609131-8.0946655-29.055603-8.0946655s-29.0556641,2.1369629-29.0556641,8.0946655l1.000061,32.3248901   C21.9443665,60.7372437,34.5052795,62.8742676,49.9999695,62.8742676z"
            ></path>
            <path
              d="M78.4859924,62.7915649c-0.2181396-0.0476685-0.4304199,0.1193237-0.4304199,0.3426514v1.7416382   c0,5.4630127-12.5609131,8.0947266-28.055603,8.0947266s-28.055603-2.1370239-28.055603-8.0947266v-1.5517578   c0-0.3028564-0.2871704-0.5294189-0.5827637-0.463562C12.011261,64.9417725,6.0888977,68.3007202,6.0888977,72.9705811   c0,8.5099487,19.659668,12.6694336,43.9110718,12.6694336c24.2514648,0,43.9111328-4.0535278,43.9111328-12.6694336   C93.9111023,68.2169189,87.9243469,64.8529663,78.4859924,62.7915649z"
            ></path>
          </g>
        </svg>
      </g>
    </svg>
  </n-icon>
</template>
