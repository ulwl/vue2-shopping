<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImg, index) in skuImageList"
        :key="index"
        @click="handler(index)"
      >
        <img :src="skuImg.imgUrl" :class="{ active: currentIndex === index }" />
      </div>
    </div>
    
    <div class="swiper-button-next" @click="currentIndex = increaseIndex" :disabled="currentIndex > skuImageList.length-1"></div>
    <div class="swiper-button-prev" @click="currentIndex = decreaseIndex" :disabled="currentIndex < 0"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  // 从父组件获取轮播的图片
  props: ["skuImageList"],
  computed: {
    increaseIndex() {
      const flag = (this.currentIndex+1) % this.skuImageList.length;
      this.$bus.$emit("getIndex", flag)
      return flag;
    },
    decreaseIndex() {
      const flag = (this.currentIndex-1 + this.skuImageList.length) % this.skuImageList.length;
      this.$bus.$emit("getIndex", flag)
      return flag;
    }
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    skuImageList: {
      immediate: true,
      handler() {
        // 在下次 DOM 更新循环结束之后执行延迟回调。
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true,
            // navigation: {
            //   nextEl: ".swiper-button-next",
            //   prevEl: ".swiper-button-prev",
            // },
            slidesPerView: 4,
            // slidesPerGroup: 1,
          });
        });
      },
    },
    // currentIndex(newValue) {
    //   if(newValue > )
    // }
  },
  methods: {
    handler(index) {
      this.currentIndex = index;
      // 触发
      this.$bus.$emit("getIndex", index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>