<template>
  <van-button class="follow-btn article-detail"
              type="info"
              v-if="followBtn.is_followed"
              color="#3296fa"
              round
              :loading='isLoding'
              size="small"
              @click="isFollowUser"
              icon="plus">关注</van-button>
  <van-button v-else
              class="follow-btn"
              round
              :loading='isLoding'
              @click="isFollowUser"
              size="small">已关注</van-button>
</template>

<script>
import { followUser, updateFollowUser } from '@/api/article.js'
export default {
  name: 'followBtn',
  data () {
    return {
      isLoding: false
    }
  },
  props: {
    followBtn: {
      type: Object,
      required: true
    }
  },
  methods: {
    async isFollowUser () {
      this.isLoding = true
      try {
        if (this.followBtn.is_followed) {
          await updateFollowUser(this.followBtn.aut_id)
        } else {
          await followUser(this.followBtn.aut_id)
        }
        this.followBtn.is_followed = !this.followBtn.is_followed
      } catch (e) {
        let message = '操作失败，请稍后再试'
        if (e.response && e.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast.success(message)
      }
      this.isLoding = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
