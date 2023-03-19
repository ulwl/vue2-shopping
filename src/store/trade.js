import { reqGetTradeInfo, reqGetUserAddress, reqSubmitOrder } from "@/api"

export default {
  state: {
    tradeInfo: {},
    userAddress: [],
    orderId: ''
  },
  mutations: {
    GETTRADEINFO(state, tradeInfo) {
      state.tradeInfo = tradeInfo;
    },
    GETUSERADDRESS(state, userAddress) {
      state.userAddress = userAddress;
    },
    SUBMITORDER(state, orderId) {
      state.orderId = orderId;
    }
  },
  actions: {
    // 交易信息
    async getTradeInfo({ commit }) {
      const result = await reqGetTradeInfo();
      if (result.code === 200) {
        commit('GETTRADEINFO', result.data);
      }
    },
    // 用户购物车
    async getUserAddress({commit}) {
      const result = await reqGetUserAddress();
      if(result.code === 200) {
        commit('GETUSERADDRESS', result.data)
      }
    },
    // 提交订单
    async submitOrder({commit}, {tradeNo, data}) {
      const result = await reqSubmitOrder(tradeNo, data);
      if(result.code === 200) {
        commit('SUBMITORDER', result.data);
      }
    }
  },
  getters: {}
}