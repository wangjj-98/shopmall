<template>
  <div id="profile">
    <van-nav-bar title="个人中心"></van-nav-bar>
    <van-card>
      <template #thumb>
        <van-image width="70" height="70" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </template>
      <template #desc>
        <div class="login">
          <span>登录/注册</span>
          <van-icon name="arrow" />
        </div>
      </template>
    </van-card>
    <div class="item">
      <div>
        <van-icon name="bag" />
        <span>商品收藏</span>
      </div>
      <div>
        <van-icon name="like" />
        <span>我的喜欢</span>
      </div>
      <div>
        <van-icon name="star" />
        <span>店铺收藏</span>
      </div>
      <div>
        <van-icon name="point-gift" />
        <span>卡卷礼包</span>
      </div>
    </div>
    <div class="item">
      <div>
        <van-icon name="bill" />
        <span>待付款</span>
      </div>
      <div>
        <van-icon name="send-gift" />
        <span>待收货</span>
      </div>
      <div>
        <van-icon name="smile-comment" />
        <span>售后</span>
      </div>
      <div>
        <van-icon name="wap-nav" />
        <span>全部订单</span>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, Card, Image, Button, Icon } from 'vant'
export default {
  name: 'Profile',
  components: {
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [Image.name]: Image,
    [Button.name]: Button,
    [Icon.name]: Icon,


  }
}
</script>

<style scoped>
.van-nav-bar {
  background-color: #ff5777;
  position: relative;
  z-index: 9;
}
.van-nav-bar__title {
  color: #fff;
}
.van-card {
  margin-top: 0px;
  padding-top: 10px;
  background-color: #fff;
}
.van-card .login {
  margin-top: 20px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  color: #333;
}
.item {
  margin-top: 10px;
  padding: 10px 0;
  display: flex;
  background-color: #fff;
}
.item div {
  flex: 1;
  text-align: center;
}
.item span {
  font-size: 12px;
  display: block;
}
</style>