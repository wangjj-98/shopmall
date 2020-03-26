<template>
  <div id="category">
    <van-nav-bar title="商品分类"></van-nav-bar>
    <div class="content">
      <tab-menu :Category="Category" @itemClick="itemClick"></tab-menu>
      <scroll class="tab-content" ref="cateScroll">
        <div>
          <van-grid :column-num="3">
            <van-grid-item
              v-for="(item,index) in  rightCategory"
              :key="index"
              :icon="item.image"
              :text="item.title"
              :url="item.link"
              @load="imageLoad"
            />
          </van-grid>
        </div>
        <!-- 标签页 -->
        <van-tabs
          v-model="tabActive"
          color="#ff5777"
          title-active-color="#ff5777"
          @click="tabClick"
        >
          <van-tab :title="item.title" v-for="(item,index) in Wallgoods" :key="index"></van-tab>
        </van-tabs>
        <!-- 商品展示 -->
        <van-grid :border="false" :column-num="2">
          <van-grid-item
            v-for="(item,index) in Wallgoods[tabType].list"
            :key="index"
            @click="gridItemClick(item.iid)"
          >
            <div class="goods">
              <van-image :src="item.img" @load="imageLoad" />
              <p>{{item.title.substring(0,14)}}</p>
              <div>
                <span class="orgPrice">{{'￥'+item.price}}</span>
                <span class="sale">{{item.sale+'人付款'}}</span>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </scroll>
    </div>
  </div>
</template>

<script>
import { NavBar, Grid, GridItem, Tabs, Tab, Image } from 'vant'
import { getCategory, getmaitKey, getWallKey } from 'network/category'
import Scroll from 'components/common/scroll/Scroll'
import TabMenu from 'components/common/TabMenu'
export default {
  name: 'Category',
  data () {
    return {
      Category: [],
      maitKey: null,
      rightCategory: [],
      miniWallKey: null,
      tabActive: 0,
      tabType: 'pop',
      Wallgoods: {
        'pop': { title: '流行', list: [] },
        'new': { title: '新款', list: [] },
        'sell': { title: '火爆', list: [] }
      },
    }
  },
  created () {
    this.getCategory()

  },
  methods: {
    getCategory () {
      //拿到商品左侧导航数据
      getCategory().then(res => {
        console.log(res);
        this.Category = res.data.category.list
        this.maitKey = res.data.category.list[0].maitKey
        this.getmaitKey(this.maitKey)
      })
    },
    getmaitKey (maitKey) {
      getmaitKey(maitKey).then(res => {
        console.log(res);
        this.rightCategory = res.data.list
        this.getWallKey('pop')
        this.getWallKey('new')
        this.getWallKey('sell')
      })
    },
    getWallKey (type) {
      this.miniWallkey = this.Category[0].miniWallkey
      getWallKey(this.miniWallkey, type).then(res => {
        console.log(res);
        this.Wallgoods[type].list = res

      })
    },
    itemClick (index) {
      this.getmaitKey(index)
    },
    imageLoad () {
      this.$refs.cateScroll.refresh()
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
    //请求详情页数据
    gridItemClick (id) {
      this.$router.push('/detail/' + id)
    },

  },
  components: {
    Scroll,
    TabMenu,
    [NavBar.name]: NavBar,
    [GridItem.name]: GridItem,
    [Grid.name]: Grid,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image

  }
}
</script>

<style scoped>
#category {
  height: 100vh;
  background-color: #fff;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 60px;
  display: flex;
}
.tab-content {
  height: 100%;
  flex: 1;
}
.van-nav-bar {
  background-color: #ff5777;
  position: relative;
  z-index: 9;
}
.van-nav-bar__title {
  color: #fff;
}
.van-sidebar-item {
  padding: 15px 10px;
}
.van-sidebar-item--select {
  color: #ff5777;
}
.van-grid-item .goods {
  position: relative;
  overflow: hidden;
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
</style>