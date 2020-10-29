<template>
  <div class="search-item">
    <form action="/"
          class="search-form">
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  background="#3296FA"
                  @focus="isHistory=false"
                  @cancel="onCancel" />
    </form>
    <SearchResult v-if="isHistory"
                  :searchText='searchText'></SearchResult>
    <SearchSuggest v-else-if="searchText"
                   :searchText='searchText'
                   @suggest='suggestions'></SearchSuggest>
    <SearchHistory :searchHistoryList='searchHistoryList'
                   @history='hitorys'
                   @update-history="deleteHistory"
                   v-else></SearchHistory>

  </div>
</template>

<script>
import SearchHistory from '@/components/search/SearchHistory'
import SearchResult from '@/components/search/SearchResult'
import SearchSuggest from '@/components/search/SearchSuggest'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchText: '',
      isHistory: false,
      searchHistoryList: getItem('TOUTIAOLISHI') || []
    }
  },
  methods: {
    onSearch (val) {
      this.isHistory = true
      const index = this.searchHistoryList.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(this.searchText)
    },
    onCancel () {
      this.$router.back()
    },
    suggestions (text) {
      this.searchText = text
      this.onSearch()
    },
    hitorys (text) {
      this.searchText = text
      this.onSearch()
    },
    deleteHistory (a) {
      this.searchHistoryList = a
    }
  },
  watch: {
    searchHistoryList () {
      setItem('TOUTIAOLISHI', this.searchHistoryList)
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
  padding-top: 104px;
  .van-search__action {
    color: #ffffff;
    &:active {
      background: #3296fa;
    }
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
