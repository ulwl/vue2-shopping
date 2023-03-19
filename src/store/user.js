import { reqGetCode, reqGetUserInfo, reqLoginUser, reqLogoutUser, reqRegisterUser } from "@/api"
import {getToken, setToken, removeToken} from '@/utils/token'

export default {
  state: {
    code: '',
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
    LOGINUSER(state, token) {
      state.token = token;
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    LOGOUTUSER(state) {
      state.token = '';
      state.userInfo = {};
      removeToken();
    }
  },
  actions: {
    async getCode({commit}, phone) {
      const result = await reqGetCode(phone);
      if(result.code === 200) {
        commit('GETCODE', result.data);
      } else {
        return Promise.reject(new Error('Require Code Failed!'));
      }
    },
    async registerUser({commit}, data) {
      const result = await reqRegisterUser(data);
      if(result.code === 200) {
        return Promise.resolve('ok');
      } else {
        return Promise.reject(new Error('Register Failed!'));
      }
    },
    async loginUser({commit}, data) {
      const result = await reqLoginUser(data);
      if(result.code === 200) {
        commit('LOGINUSER', result.data.token);
        setToken(result.data.token);
      } else {
        return Promise.reject(new Error('Login Failed!'));
      }
    },
    async getUserInfo({commit, state}) {
      const result = await reqGetUserInfo();
      if(result.code === 200) {
        commit('GETUSERINFO', result.data);
      }
    },
    async logoutUser({commit}) {
      const result = await reqLogoutUser();
      if(result.code === 200) {
        commit('LOGOUTUSER');
        return Promise.resolve('ok')
      } else {
        return Promise.reject('Logout Failed!');
      }
    }
  },
  getters: {}
}