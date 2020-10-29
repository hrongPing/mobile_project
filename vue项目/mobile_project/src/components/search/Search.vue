<template>
  <div class="search-item">
    <form action="/">
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  background="#3296FA"
                  @focus="isHistory=false"
                  @cancel="onCancel" />
    </form>
    <SearchResult v-if="isHistory"></SearchResult>
    <SearchSuggest v-else-if="searchText"
                   :searchText='searchText'></SearchSuggest>
    <SearchHistory v-else></SearchHistory>

  </div>
</template>

<script>
import SearchHistory from '@/components/search/SearchHistory'
import SearchResult from '@/components/search/SearchResult'
import SearchSuggest from '@/components/search/SearchSuggest'
export default {
  data () {
    return {
      searchText: '',
      isHistory: false
    }
  },
  methods: {
    onSearch (val) {
      this.isHistory = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  }
}
</script>

<style lang="scss" scoped>
.search-item {
  .van-search__action {
    color: #ffffff;
    &:active {
      background: #3296fa;
    }
  }
}
</style>
