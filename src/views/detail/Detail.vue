<template>
  <div id="detail">
    <!-- 导航栏 -->
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="30px" color="#666" @click="back" />
      </template>
      <template #title>
        <div>
          <a
            href="#"
            v-for="(item,index) in titles"
            :key="index"
            :class="{active:contentIndex===index}"
            @click="titleClick(index)"
          >{{item}}</a>
        </div>
      </template>
    </van-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="#fff">
          <van-swipe-item v-for="(image, index) in topImages" :key="index">
            <img v-lazy="image" @load="swiperLoad" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商品信息 -->
      <van-card id="goods">
        <template #title>
          <span class="title">{{GoodsInfo.title}}</span>
        </template>
        <template #price>
          <van-tag round type="warning" size="medium">{{GoodsInfo.discount}}</van-tag>
          <span>{{'￥'+GoodsInfo.realPrice}}</span>
        </template>
        <template #origin-price>
          <span>{{GoodsInfo.oldPrice}}</span>
        </template>
        <template #bottom v-if="GoodsInfo.services">
          <div class="columns">
            <span>{{columns[0]}}</span>
            <span>{{columns[1]}}</span>
            <span>{{GoodsInfo.services[0].name}}</span>
          </div>
          <div class="services">
            <span v-for="index in GoodsInfo.services.length-1" :key="index">
              <van-icon :name="GoodsInfo.services[index].icon" />
              {{GoodsInfo.services[index].name}}
            </span>
          </div>
        </template>
      </van-card>
      <!-- 店铺信息 -->
      <van-card id="shop">
        <template #title>
          <div class="logo">
            <van-image round width="50px" height="50px" :src="shop.logo" />
            <span>{{shop.name}}</span>
          </div>
        </template>
        <template #bottom>
          <div class="fans">
            <span>
              <p style="fontSize:16px">{{(shop.sells / 10000).toFixed(1)+'万'}}</p>
              <p>总销量</p>
            </span>
            <span>
              <p style="fontSize:16px">{{shop.goodsCount}}</p>
              <p>全部宝贝</p>
            </span>
          </div>
          <div class="score" v-if="shop.score">
            <span v-for="(item,index) in shop.score" :key="index">
              {{item.name}}
              <van-tag
                mark
                :type="item.isBetter ? 'danger':'success'"
              >{{item.score.toFixed(2)}} {{item.isBetter ? '高':'低'}}</van-tag>
            </span>
          </div>
        </template>
      </van-card>
      <!-- 店铺评论 -->
      <div class="comment" v-if=" commentInfo.length !==0">
        <div class="title">
          <span>用户评价</span>
          <span>更多</span>
        </div>
        <div class="content">
          <div class="user" v-if="commentInfo.user">
            <van-image width="40px" height="40px" round :src="commentInfo.user.avatar" />
            <span>{{commentInfo.user.uname}}</span>
          </div>
          <p>{{commentInfo.content}}</p>
          <p v-if="commentInfo.explain">{{commentInfo.explain}}</p>
          <p
            style="fontSize:12px"
          >{{commentInfo.created*1000 | formatDate}}{{' '+commentInfo.style}}</p>
          <div>
            <van-image
              class="userShow"
              width="80"
              height="80"
              :src="item"
              v-for="(item,index) in commentInfo.images"
              :key="index"
            />
          </div>
        </div>
      </div>
      <!-- 商品参数 -->
      <div class="info" ref="InfoTop">
        <van-cell @click="showCell=!showCell" is-link :arrow-direction="showCell ? 'down':''">商品参数</van-cell>
        <van-cell-group v-if="showCell">
          <van-cell
            :title="item.key"
            :value="item.value"
            v-for="(item,index) in paramInfo.infos"
            :key="index"
          />
        </van-cell-group>
      </div>
      <!-- 店铺详情 -->
      <div class="goodsDetail">
        <div v-for="(item,index) in detailImage" :key="index">
          <img :src="index" v-for="index in item.list" :key="index" @load="imageLoad" />
        </div>
      </div>
      <!-- 推荐商品展示 -->
      <van-grid :border="false" :column-num="2" ref="GridTop">
        <van-grid-item
          v-for="(item,index) in  recommends"
          :key="index"
          @click="gridClick(item.item_id)"
        >
          <div class="goods">
            <van-image :src="item.image" />
            <p>{{item.title.substring(0,14)+'...'}}</p>
            <div>
              <span class="orgPrice">{{item.discountPrice}}</span>
              <span class="sale">{{item.itemLikes+'人喜欢'}}</span>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </scroll>
    <!-- 底部工具栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/cart')"
        :badge="cartList.length"
      />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {  NavBar, Icon, SwipeItem, Swipe, Lazyload, Card,
  Tag, Image, Cell, CellGroup, Popup, List, Grid, GridItem,
  GoodsAction, GoodsActionIcon, GoodsActionButton, Sku} from 'vant'
import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend } from 'network/datail.js'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop'
export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      titles: ['商品', '评论', '参数', '推荐'],
      contentIndex: 0,
      topImages: [],
      GoodsInfo: {},
      columns: [],
      shop: {},
      detailImage: [],
      isshow: false,
      paramInfo: {},
      showCell: false,
      commentInfo: {},
      InfoOffsetTop: 0,
      GridOffsetTop: 0,
      recommends: [],
    }
  },
  created () {
    //保存存入的id
    this.iid = this.$route.params.id
    this.getDetail(this.iid)
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list

    })

  },
  methods: {
    titleClick (i) {
      this.contentIndex = i
      switch (this.contentIndex) {
        case 0:
          this.$refs.scroll.scrollTo(0, 0)
          break
        case 1:
          this.$refs.scroll.scrollTo(0, -750)
          break
        case 2:
          this.$refs.scroll.scrollTo(0, -this.InfoOffsetTop)
          break
        case 3:
          this.$refs.scroll.scrollTo(0, -this.GridOffsetTop + 40)
          break
      }
    },
    //返回上一次
    back () {
      this.$router.back()
    },
    getDetail (iid) {
      //根据iid请求数据
      getDetail(iid).then(res => {
        console.log(res);
        const data = res.result
        //获取轮播图数据
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.GoodsInfo = new GoodsInfo(data.itemInfo, data.shopInfo.services)
        this.columns = data.columns
        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //获取商品图片信息
        this.detailImage = data.detailInfo.detailImage
        //获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取商品评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
    },
    //监听图片加载完 调用scroll.refresh()
    imageLoad () {
      this.$refs.scroll.refresh()
      this.GridOffsetTop = this.$refs.GridTop.$el.offsetTop

    },
    contentScroll (position) {
      //判断回到顶部按钮是否显示
      this.isshow = (-position.y) > 1000
      if ((-position.y) > this.GridOffsetTop - 50) {
        this.contentIndex = 3
      }
      else if ((-position.y) > this.InfoOffsetTop - 50) {
        this.contentIndex = 2
      } else if ((-position.y) > 740) {
        this.contentIndex = 1
      } else {
        this.contentIndex = 0
      }
    },
    //回到顶部
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    //拿到商品参数按钮到顶部的距离
    swiperLoad () {
      this.InfoOffsetTop = this.$refs.InfoTop.offsetTop
    },
    //点击推荐商品 去到商品详情
    gridClick (id) {
      console.log(id);
      this.iid = id
      this.getDetail(this.iid)
    },
    addCart () {
      const product = {}
      product.image = this.topImages[0];
      product.title = this.GoodsInfo.title;
      product.desc = this.GoodsInfo.desc;
      product.price = this.GoodsInfo.realPrice;
      product.iid = this.iid;
      product.count = 1
      product.checked = false
      this.$store.commit('addCart', product)
      this.$toast('已添加至购物车')

    }
  },
  computed: {
    ...mapState(['cartList'])
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Image.name]: Image,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [List.name]: List,
    [CellGroup.name]: CellGroup,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Sku.name]: Sku,
    Scroll,
    BackTop
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
}
.content {
  height: calc(100% - 46px);
}
.van-nav-bar {
  position: relative;
  z-index: 9;
}
.van-nav-bar__title {
  font-size: 14px;
}
.van-nav-bar__title a {
  padding: 0 10px;
}
.active {
  color: #ff5777;
}
.swipe {
  width: 100%;
  height: 400px;
}
.van-swipe {
  width: 100%;
  height: 100%;
}
.van-swipe img {
  width: 100%;
  height: 100%;
}
#goods {
  margin-top: 0px;
  background-color: #fff;
}
#goods .van-card__content .title {
  font-size: 14px;
  font-weight: 600;
}
#goods .van-card__bottom {
  margin: 15px 0 10px 0;
}
#goods .van-card__price {
  font-size: 20px;
  padding: 10px 5px;
  color: rgb(240, 88, 88);
}
#goods .columns {
  display: flex;
  padding-bottom: 10px;
  font-size: 12px;
  justify-content: space-between;
  border-bottom: 2px solid rgb(236, 236, 236);
}
#goods .columns span {
  text-align: center;
}
#goods .services {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#goods .services span {
  width: 100px;
  font-size: 12px;
  text-align: center;
}
#shop {
  background-color: #fff;
}
#shop .logo {
  font-size: 16px;
  color: #666;
  font-weight: 600;
}
#shop .logo span,
#shop .logo .van-image {
  margin-left: 5px;
  vertical-align: middle;
}
#shop .van-card__bottom {
  display: flex;
}
#shop .van-card__bottom .fans,
#shop .van-card__bottom .score {
  flex: 1;
}
#shop .fans span {
  display: inline-block;
  padding: 20px 18px;
}
#shop .score span {
  display: inline-block;

  padding-left: 20px;
  border-left: 2px solid rgb(245, 240, 240);
}
#shop .score .van-tag {
  margin-left: 15px;
}
.goodsDetail {
  margin-top: 5px;
  background-color: #fff;
}
.goodsDetail span {
  padding-left: 15px;
  margin-top: 10px;
}
.goodsDetail img {
  width: 100%;
}
.info {
  margin-top: 15px;
}
.comment {
  margin-top: 5px;
  background-color: #fff;
}
.comment .title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.comment .title span {
  padding: 15px 10px;
}
.comment .content .user {
  padding: 10px;
}
.comment .content .user .van-image {
  vertical-align: middle;
}
.comment .content .user span {
  margin-left: 10px;
  vertical-align: middle;
  font-size: 16px;
}
.comment .content p {
  padding: 10px;
  font-size: 14px;
}
.comment .userShow {
  margin: 0 5px;
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
</style>