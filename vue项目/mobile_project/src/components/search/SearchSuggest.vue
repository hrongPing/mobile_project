<template>
  <div>
    <van-cell v-for="(v,i) in suggestList"
              :key="i"
              icon="search">
      <div slot="title"
           v-html="handler(v)"></div>
    </van-cell>

  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestions } from '@/api/search.js'

export default {
  data () {
    return {
      suggestList: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async loadGetSuggestions (value) {
      try {
        const { data } = await getSuggestions(value)
        console.log(data)
        this.suggestList = data.data.options
      } catch (e) {
        this.$toast.fail('获取数据失败')
      }
    },
    handler (v) {
      const color = '<span class="active">this.searchText</span>'
      const reg = new RegExp(this.searchText, 'gi')
      return v.replace(reg, color)
    }
  },

  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadGetSuggestions(value)
      }, 200),
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .active {
  color: #3296fa;
}
</style>
