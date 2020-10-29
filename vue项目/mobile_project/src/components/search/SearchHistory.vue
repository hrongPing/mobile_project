import { setItem } from '@/utils/storage.js';
<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDeleteBtn">
        <span @click="$emit('update-history',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteBtn=false">完成</span>
      </div>
      <van-icon name="delete"
                @click="isDeleteBtn=true"
                v-else />
    </van-cell>
    <van-cell :title="v"
              v-for="(v,i) in searchHistoryList"
              @click="onHistory(v,i)"
              :key="i">
      <van-icon name="close"
                v-if="isDeleteBtn"></van-icon>
    </van-cell>
  </div>
</template>

<script>

export default {
  name: 'searchHistory',
  data () {
    return {
      isDeleteBtn: false
    }
  },
  props: {
    searchHistoryList: {
      type: Array,
      required: true
    }
  },
  methods: {
    onHistory (v, i) {
      if (this.isDeleteBtn) {
        this.searchHistoryList.splice(i, 1)
      } else {
        this.$emit('history', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
