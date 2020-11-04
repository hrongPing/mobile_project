<template>
  <van-button @click="isCollect"
              :loading='isloading'>
    <van-icon :color="isCollet?'#ffa500':'#777'"
              :name="isCollet?'star':'star-o'" />
  </van-button>
</template>

<script>
import { collectUser, updateCollectUser } from '@/api/article.js'
export default {
  name: 'collectBtn',
  data () {
    return {
      isloading: false
    }
  },
  props: {
    isCollet: {
      type: Boolean,
      required: true
    },
    articlId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async isCollect () {
      this.isloading = true
      try {
        if (this.isCollet) {
          await updateCollectUser(this.articlId)
          this.$emit('collectArt', !this.isCollet)
          this.$toast.success('取消收藏成功')
        } else {
          await collectUser(this.articlId)
          this.$emit('collectArt', !this.isCollet)
          this.$toast.success('收藏成功')
        }
      } catch (e) {
        this.$toast.success('操作失败,请稍后再试')
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
