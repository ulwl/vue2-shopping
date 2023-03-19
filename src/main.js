import Vue from 'vue'
import App from './App.vue'
// 引入TypeNav和Pagination为全局组件
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
import router from '@/router';
import store from '@/store';
import '@/mock/mockServer';
// Swiper的样式
import 'swiper/css/swiper.min.css';
import * as API from '@/api';
import { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import loadimage from '@/assets/1.jpg';
import '@/utils/validate';
import {reqCategoryList} from '@/api';

Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);

// 使用懒加载插件，配置对象为加载时显示的图片
Vue.use(VueLazyload, {
  loading: loadimage,
})

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false;
// 首页需要请求三级分类一次
reqCategoryList();

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
    // 使所有组件实例可以调用API
    Vue.prototype.$API = API;
  }
}).$mount('#app')
