<template>
  <div id="app">
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>

import TabBar from './components/common/TabBar'
export default {
  components: {
    TabBar
  }
}
</script>

<style >
@import 'assets/css/base.css';
</style>
