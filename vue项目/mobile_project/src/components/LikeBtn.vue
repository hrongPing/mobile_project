<template>
  <div>
    <van-button :loading='isloading'
                @click="isLikeArticle">
      <van-icon :color="value===1?'#ffa500':'#777'"
                :name="value===1?'good-job':'good-job-o'" />
    </van-button>
  </div>
</template>

<script>
import { likeUser, updatelikeUser } from '@/api/article'
export default {
  name: 'likeBtn',
  data () {
    return {
      isloading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    likeArtId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async isLikeArticle () {
      this.isloading = true
      let status = -1
      try {
        if (this.value === 1) {
          await updatelikeUser(this.likeArtId)
        } else {
          await likeUser(this.likeArtId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞成功')
      } catch (e) {
        this.$toast.fail('操作失败，请稍后再试!')
      }
      this.isloading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.van-button--default {
  padding: 0;
  border: 1px solid transparent;
}
</style>
