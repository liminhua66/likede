<template>
  <div class="pagination">
    <!-- <ul>
      <li v-for="(item,index) in list" :key="index">{{ item }}</li>
    </ul> -->

    <div class="page">
      共{{ total }}记录&nbsp;&nbsp;第{{ page }}/{{ totalPages }}页
    </div>
    <button class="forward" :disabled="page === 1" @click="forward">
      上一页
    </button>
    <button class="backword" :disabled="page === totalPages" @click="backword">
      下一页
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 150
      /* list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] */
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    forward() {
      this.page--
    },
    backword() {
      this.page++
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 32px 16px;
}

.page {
  display: inline-block;
  flex: 10;
}

.backword,
.forward {
  font-size: 13px;
  width: 70px;
  height: 32px;
  margin: 0 16px;
  border-radius: 2px;
  background-color: #d5ddf8;
  border: 0;
}
</style>
