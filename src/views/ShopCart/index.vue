<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="changeChecked(cartInfo.skuId, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('-', cartInfo, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeSkuNum('change', cartInfo, $event.target.value * 1)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('+', cartInfo, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >{{ cartInfo.skuPrice * cartInfo.skuNum }}.00</span
            >
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deleteCartGoods(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          @change="changeAllChecked"
          :checked="isChecked && cartInfoList.length>0"
          :disabled="!cartInfoList.length"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCartGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span style="color: red">{{ totalCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartInfoList"]),
    // 总共多少件
    totalCount() {
      let sum = 0;
      this.cartInfoList.forEach(item => (sum += item.isChecked == 1 ? 1 : 0));
      return sum;
    },
    // 总价
    totalPrice() {
      let sumPrice = this.cartInfoList.reduce(
        (pre, item) =>
          (pre += item.isChecked == 1 ? item.skuPrice * item.skuNum : 0),
        0
      );
      // let sumPrice = 0;
      // this.cartInfoList.forEach(item => {
      //   if(item.isChecked == 1) {
      //     sumPrice += item.skuPrice * item.skuNum;
      //   }
      // })
      return sumPrice;
    },
    // 全选按钮
    isChecked() {
      return this.cartInfoList.every(item => item.isChecked == 1);
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    // checkAll(event) {
    //   this.cartInfoList.forEach((item) => {
    //     item.isChecked = event.target.checked;
    //   });
    // },
    changeSkuNum: throttle(async function (type, cartInfo, num) {
      switch (type) {
        case "+":
          break;
        case "-":
          num = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(num) || num < 1) {
            num = 0;
          } else {
            num = parseInt(num) - cartInfo.skuNum;
          }
      }
      try {
        await this.$store.dispatch("addOrUpdateCart", {
          skuId: cartInfo.skuId,
          skuNum: num,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    async deleteCartGoods(skuId) {
      try {
        await this.$store.dispatch("deleteCartGoods", skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 处理单个商品的选择按钮
    async changeChecked(skuId, isChecked) {
      try {
        await this.$store.dispatch('changeChecked', {skuId, isChecked: isChecked ? 1 : 0});
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteAllCartGoods() {
      if(this.cartInfoList.length < 1) return false;
      try {
        await this.$store.dispatch('deleteAllCartGoods');
        this.getData();
      } catch (error) {
        alert('Clear Failed');
      }
    },
    // 处理全选按钮事件
    async changeAllChecked(event) {
      if(this.cartInfoList.length < 1) return false;
      try {
        await this.$store.dispatch('changeAllChecked', event.target.checked ? 1 : 0);
        this.getData();
      } catch (error) {
        alert('Change Failed');
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 10%;
        }

        .cart-list-con2 {
          width: 40%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>