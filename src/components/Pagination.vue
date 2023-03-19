<template>
  <div class="pagination">
    <!-- 上一页按钮 -->
    <button :disabled="startNumAndEndNum.start <= 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <!-- 第1页按钮 -->
    <button v-show="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">1</button>
    <!-- 省略号 -->
    <button v-show="startNumAndEndNum.start > 2">···</button>
    <!-- 连续分页 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="startNumAndEndNum.start <= page"
      :class="{ active: pageNo == page }" @click="$emit('getPageNo', page)">
      {{ page }}
    </button>

    <button v-show="startNumAndEndNum.end < pageTotal - 1">···</button>
    <!-- 结尾标记如果小于总页数会显示 -->
    <button v-show="startNumAndEndNum.end < pageTotal" @click="$emit('getPageNo', pageTotal)">
      {{ pageTotal }}
    </button>
    <!-- 下一页，如果当前页等于总页数，则禁用按钮。 -->
    <button :disabled="pageNo == pageTotal" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <h3>{{startNumAndEndNum}}  ---  {{pageNo}}</h3> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 当前页，每页多少条数据，总条数，连续页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页数
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 开始和结束值
    startNumAndEndNum() {
      let start = 0, end = 0;
      const { pageNo, pageTotal, continues } = this;
      start = pageNo - parseInt(continues / 2);
      end = pageNo + parseInt(continues / 2);
      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > pageTotal) {
        end = pageTotal;
        start = pageTotal - continues + 1;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      // cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>