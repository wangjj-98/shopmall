<template>
  <div class="home">
    <van-nav-bar title="小王的购物街"></van-nav-bar>
    <!-- 标签页 -->
    <van-tabs
      v-model="tabActive"
      color="#ff5777"
      title-active-color="#ff5777"
      @click="tabClick"
      ref="tabTop"
      class="tabtwo"
      v-if="isTab"
    >
      <van-tab :title="item.title" v-for="(item,index) in goods" :key="index"></van-tab>
    </van-tabs>
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <div class="swiper">
        <van-swipe :autoplay="3000" indicator-color="#fff">
          <van-swipe-item v-for="(item, index) in banners" :key="index" @click="jump(item.link)">
            <img :src="item.image" @load="swiperLoad" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 推荐信息展示 -->
      <div class="recommend">
        <div class="recommend-item" v-for="(item,index) in  recommends" :key="index">
          <a :href="item.link">
            <van-image round width="70px" height="70px" :src="item.image" />
            <p>{{item.title}}</p>
          </a>
        </div>
      </div>
      <!-- 本周流行模块 -->
      <div class="feature">
        <a href="https://act.mogujie.com/zzlx67">
          <img src="~assets/images/home/recommend_bg.jpg" alt />
        </a>
      </div>
      <!-- 标签页 -->
      <van-tabs
        v-model="tabActive"
        color="#ff5777"
        title-active-color="#ff5777"
        @click="tabClick"
        ref="tabTop"
      >
        <van-tab :title="item.title" v-for="(item,index) in goods" :key="index"></van-tab>
      </van-tabs>
      <!-- 商品展示 -->
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item,index) in goods[tabType].list" :key="index" :url="item.link">
          <div class="goods">
            <van-image :src="item.show.img" @load="imageLoad" />
            <p>{{item.title.substring(0,14)+'...'}}</p>
            <div>
              <span class="orgPrice">{{item.orgPrice}}</span>
              <span class="sale">{{item.sale+'人付款'}}</span>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </scroll>
    <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import {  NavBar, Swipe, SwipeItem,
  Lazyload, Image, Tab, Tabs,
  Sticky, Grid, GridItem} from 'vant'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop'
export default {
  data () {
    return {
      banners: [],
      recommends: [],
      tabActive: 0,
      tabType: 'pop',
      goods: {
        'pop': { title: '流行', page: 0, list: [] },
        'new': { title: '新款', page: 0, list: [] },
        'sell': { title: '火爆', page: 0, list: [] }
      },
      isshow: false,
      tabOffsetTop: 0,
      isTab: false
    }
  },
  created () {
    this.getHomeMultidata(),
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')

  },
  methods: {
    //轮播图跳转
    jump (link) {
      window.location.href = link
    },
    //请求数据
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //请求商品数据
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...(res.data.list))
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()

      })
    },
    //切换tab获取商品
    tabClick () {
      switch (this.tabActive) {
        case 0:
          this.tabType = 'pop'
          break
        case 1:
          this.tabType = 'new'
          break
        case 2:
          this.tabType = 'sell'
          break
      }
    },
    //回到顶部
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) {
      //判断回到顶部按钮是否显示
      this.isshow = (-position.y) > 1000
      //tab组件是否吸顶
      this.isTab = (-position.y) > this.tabOffsetTop
    },
    //上拉加载更多
    loadMore () {
      this.getHomeGoods(this.tabType)

    },
    //监听图片加载完 调用scroll.refresh()
    imageLoad () {
      const refresh = this.debounce(this.$refs.scroll.refresh, 500)
      refresh()
    },
    //防抖函数
    debounce (fn, wait) {
      let timer = null;
      return function (...args) {
        if (timer !== null)
          clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, wait);
      }
    },
    swiperLoad () {
      this.tabOffsetTop = this.$refs.tabTop.$el.offsetTop
    }
  },
  components: {
    Scroll,
    BackTop,
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Sticky.name]: Sticky,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem

  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  position: relative;
}
.van-nav-bar {
  background-color: #ff5777;
}
.van-nav-bar__title {
  color: #fff;
}
.swiper {
  width: 100%;
  height: 200px;
}
.swiper .van-swipe {
  width: 100%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.recommend {
  display: flex;
  width: 100%;
  height: 140px;
  background-color: #fff;
}
.recommend-item {
  flex: 1;
  width: 25%;
  height: 100%;
  text-align: center;
  padding-top: 15px;
  font-size: 14px;
}
.feature {
  margin-top: 10px;
}
.feature a {
  display: block;
}
.van-grid-item .goods {
  position: relative;
  overflow: hidden;
  width: 171px;
  height: 285px;
  box-shadow: 0 0 1px rgb(239, 179, 179);
  border-radius: 10px;
  background-color: #fafafa;
}
.van-grid-item .goods .van-image {
  width: 100%;
  height: 70%;
}
.van-grid-item .goods p {
  margin-top: 5px;
  font-size: 12px;
}
.van-grid-item .goods .orgPrice {
  position: absolute;
  left: 5px;
  bottom: 5px;
  display: inline-block;
  color: #f30b35;
}
.van-grid-item .goods .sale {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 12px;
}
.scroll {
  overflow: hidden;
  position: absolute;
  top: 46px;
  bottom: 50px;
  left: 0;
  right: 0;
}
.tabtwo {
  position: relative;
  z-index: 9;
}
</style>