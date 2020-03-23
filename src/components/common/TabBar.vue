<template>
  <van-tabbar v-model="active" active-color="#ff5777" inactive-color="#000">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/datail">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  data () {
    return {
      active: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png'
      }

    }
  }
}
</script>

<style>
</style>