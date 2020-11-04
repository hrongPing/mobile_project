<template>
  <div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error='error'
              :immediate-check='false'
              error-text="加载失败,请点击重试"
              @load="onLoad">
      <CommentItem v-for="(item,index) in list"
                   :key="index"
                   :comment='item'
                   :title="item.content" />
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment.js'
import CommentItem from '@/components/comment/CommentItem.vue'
// import { mapMutations } from 'vuex'
export default {
  name: 'Comment',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      source: this.sourceId,
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  components: {
    CommentItem
  },
  provide: function () {
    return {
      artId: this.sourceId
    }
  },
  props: {
    sourceId: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      validate () {
        return ['a', 'c'].includes()
      },
      default: 'a'
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getCommentList({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        this.$emit('totalCount', data.data)
        const { results } = data.data
        this.$store.commit('getCommentList', this.list)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
