<template>
  <div class="back-top">
    <van-button round icon="arrow-up" type="default"></van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  components: {
    [Button.name]: Button
  },

}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 15px;
  bottom: 60px;
  z-index: 99;
}
</style>
