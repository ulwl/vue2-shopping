import { reqGetCartList, reqDeleteCartGoods, reqChangeChecked} from "@/api"

export default {
  state: {
    cartList: {}
  },
  mutations: {
    GETCARTLIST(state, cartList) {
      state.cartList = cartList;
    }
  },
  actions: {
    // 购物车信息
    async getCartList({commit}) {
      const result = await reqGetCartList();
      if(result.code === 200) {
        commit('GETCARTLIST', result.data[0]);
      }
    },
    // 删除购物车商品
    async deleteCartGoods({commit}, skuId) {
      const result = await reqDeleteCartGoods(skuId);
      if(result.code === 200) {
        return Promise.resolve('ok');
      } else {
        return Promise.reject(new Error('Delete Failed!'));
      }
    },
    // 改变商品的选中状态
    async changeChecked({commit}, {skuId, isChecked}) {
      const result = await reqChangeChecked(skuId, isChecked);
      if(result.code === 200) {
        return Promise.resolve('ok');
      } else {
        return Promise.reject(new Error('Change Failed!'));
      }
    },
    // 删除勾选的商品，没有相关接口，只能遍历删除
    deleteAllCartGoods({dispatch, getters}) {
      const promise = [];
      getters.cartInfoList.forEach(item => {
        if(item.isChecked == 1) {
          const result = dispatch('deleteCartGoods', item.skuId)
          promise.push(result);
        }
      });
      return Promise.all(promise)
    },
    // 全选商品，没有相关接口，只能遍历勾选
    changeAllChecked({dispatch, getters}, isChecked) {
      const promiseAll = [];
      getters.cartInfoList.forEach(item => {
        const result = item.isChecked != isChecked ? dispatch('changeChecked', {skuId: item.skuId, isChecked}) : '';
        promiseAll.push(result);
      });
      return Promise.all(promiseAll);
    }
  },
  getters: {
    cartInfoList(state) {
      return state?.cartList?.cartInfoList || [];
    }
  }
}