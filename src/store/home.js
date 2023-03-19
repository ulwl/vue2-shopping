import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"

export default {
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  mutations: {
    GETCATEGORY(state, categoryList) {
      state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList
    }
  },
  actions: {
    // 三级列表
    async getCategory({ commit }) {
      const result = await reqCategoryList();
      if (result.code === 200) {
        commit('GETCATEGORY', result.data.slice(0, 16));
      }
    },
    // 轮播图
    async getBannerList({ commit }) {
      const result = await reqGetBannerList();
      if (result.code === 200) {
        commit('GETBANNERLIST', result.data);
      }
    },
    // 底部商品列表
    async getFloorList({ commit }) {
      const result = await reqGetFloorList();
      if (result.code === 200) {
        commit('GETFLOORLIST', result.data);
      }
    }
  },
  getters: {}
}