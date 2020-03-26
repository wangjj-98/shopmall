<template>
  <scroll id="tab-menu">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        :title="item.title"
        v-for="(item,index) in Category"
        :key="index"
        @click="cateClick(item.maitKey)"
      />
    </van-sidebar>
  </scroll>
</template>

<script>
import Scroll from './scroll/Scroll'
import { Sidebar, SidebarItem, } from 'vant'
export default {
  data () {
    return {
      activeKey: 0,
    }
  },
  props: {
    Category: Array
  },
  components: {
    Scroll,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
  },
  methods: {
    cateClick (index) {
      this.$emit('itemClick', index)
    }
  }


}
</script>

<style scoped>
#tab-menu {
  background-color: #fff;
  box-sizing: border-box;
}
</style>