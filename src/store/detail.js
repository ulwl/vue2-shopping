import { reqAddCart, reqGetGoodsInfo } from "@/api";
import {getUUID} from '@/utils/uuid_token';

export default {
  state: {
    goodsInfo: {},
    uuid_token: getUUID()
  },
  mutations: {
    GETGOODSINFO(state, goodsInfo) {
      state.goodsInfo = goodsInfo;
    }
  },
  actions: {
    // 商品信息
    async getGoodsInfo({commit}, skuId) {
      const result = await reqGetGoodsInfo(skuId);
      if(result.code === 200) {
        commit('GETGOODSINFO', result.data);
      }
    },
    // 添加购物车
    async addOrUpdateCart(_, {skuId, skuNum}) {
      const result = await reqAddCart(skuId, skuNum);
      if(result.code === 200) {
        return Promise.resolve('添加购物车成功');
      } else {
        return Promise.reject(new Error('add Cart Failed!'));
      }
    }
  },
  getters: {
    categoryView(state) {
      return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
      return state.goodsInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodsInfo.spuSaleAttrList || [];
    }
  }
}