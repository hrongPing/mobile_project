<template>
  <div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad">
      <van-cell v-for="(item,index) in list"
                :key="index"
                :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 15,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (e) {
        this.$toast.fail('数据获取失败，请稍后再试')
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
