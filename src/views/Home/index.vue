<template>
  <div>
    <TypeNav />
    <Container />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="index" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
// 除去Header和Footer组件，首页的组成部分
import Container from '@/views/Home/Container';
import Recommend from '@/views/Home/Recommend';
import Rank from '@/views/Home/Rank';
import Like from '@/views/Home/Like';
import Floor from '@/views/Home/Floor';
import Brand from '@/views/Home/Brand';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({ floorList: state => state.home.floorList })
  },
  mounted() {
    this.$store.dispatch('getFloorList');
  }
}
</script>

<style></style>