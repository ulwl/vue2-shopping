<template>
  <div>
    <!-- 头部Logo及搜索框 -->
    <Header/>
    <router-view></router-view>
    <!-- 控制底部组件的显示与隐藏 -->
    <Footer v-show="this.$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  mounted() {
    // 组件挂载完毕需要请求三级列表
    this.$store.dispatch("getCategory");
  }
};
</script>

<style lang="less">

</style>