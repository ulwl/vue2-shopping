import { reqGetGoodsList } from "@/api"

export default {
  state: {
    searchList: {}
  },
  mutations: {
    GETGOODSLIST(state, searchList) {
      state.searchList = searchList;
    }
  },
  actions: {
    // 搜索商品的信息
    async getGoodsList({commit}, data) {
      const result = await reqGetGoodsList(data);
      if(result.code === 200) {
        commit('GETGOODSLIST', result.data);
      }
    }
  },
  getters: {
    goodsList(state) {
      return state.searchList.goodsList || [];
    },
    attrsList(state) {
      return state.searchList.attrsList || [];
    },
    trademarkList(state) {
      return state.searchList.trademarkList || [];
    }
  }
}