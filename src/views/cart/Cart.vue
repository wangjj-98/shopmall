<template>
  <div id="cart">
    <!-- 导航栏 -->
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    <scroll ref="scroll" class="content">
      <van-swipe-cell v-for="(item) in cartList" :key="item.iid">
        <van-card
          :num="item.count"
          :price="item.price * item.count"
          :title="item.title"
          class="goods-card"
          :thumb="item.image"
        >
          <template #footer>
            <van-checkbox v-model="item.checked" ref="checkbox"></van-checkbox>
            <van-stepper v-model="item.count" />
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delgoods(item.iid)"
          />
        </template>
      </van-swipe-cell>
    </scroll>
    <van-submit-bar :price="totalPrice" :button-text="checkLength" @submit="onSubmit">
      <van-checkbox @click="checkAll" v-model="isCheckAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import { Button, SwipeCell, Card, NavBar, Stepper, Checkbox, CheckboxGroup, SubmitBar } from 'vant'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'cart',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['delgoods', 'checkAll']),
    onClickLeft () {
      this.$router.go(-1)
    },
    radioClick () {
      this.radio = !this.radio
    },
    checkAll () {
      if (this.isCheckAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        })
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = true
        })
      }
    },
    onSubmit () {
      let num = this.$store.state.cartList.filter(item => item.checked).length
      if (num === 0) {
        this.$toast('请选择您要购买的商品')
      }


    }
  },
  computed: {
    ...mapState(['cartList']),
    //计算商品总结
    totalPrice () {
      //返回选中的商品
      return 100 * this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    //计算选中的商品数量
    checkLength () {
      return '结算 (' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).length + ')'
    },
    isCheckAll: {
      get () {
        if (this.$store.state.cartList.length === 0) return false
        return !(this.$store.state.cartList.find(item => {
          return !item.checked
        }))
      },
      set (val) {
        val = !(this.$store.state.cartList.find(item => {
          return !item.checked
        }))
      }

    }

  },
  activated () {
    this.$refs.scroll.refresh()
  },
  components: {
    Scroll,
    [Button.name]: Button,
    [SwipeCell.name]: SwipeCell,
    [Card.name]: Card,
    [NavBar.name]: NavBar,
    [Stepper.name]: Stepper,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [SubmitBar.name]: SubmitBar

  }
}
</script>

<style scoped>
#cart {
  position: relative;
  height: 100vh;
}
.van-nav-bar {
  background-color: #ff5777;
}
.van-nav-bar__title,
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: #fff;
}

.content {
  height: calc(100% - 156px);
}
.van-nav-bar {
  position: relative;
  z-index: 9;
}
.goods-card {
  margin: 5px;
  background-color: #fff;
  border-radius: 10px;
}

.delete-button {
  height: 100%;
}
.van-card__footer {
  display: flex;
  justify-content: space-between;
}
.van-submit-bar {
  margin-bottom: 60px;
  border-bottom: 1px solid #ccc;
}
</style>