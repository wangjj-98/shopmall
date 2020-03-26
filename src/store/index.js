import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart (state, payPload) {
      let oldPro = null;
      state.cartList.forEach(item => {
        if (item.iid === payPload.iid) {
          oldPro = item;
        }
      });
      if (oldPro) {
        oldPro.count += 1
      } else {
        payPload.count = 1
        state.cartList.push(payPload)
      }
    },
    delgoods (state, iid) {
      let idx = state.cartList.findIndex(item => item.iid === iid)
      state.cartList.splice(idx, 1)
    },
    checkAll (state) {
      state.cartList.forEach(item => {
        item.checked = !item.checked
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
