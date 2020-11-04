<template>
  <div class="username-container">
    <van-nav-bar title="标题"
                 left-text="取消"
                 right-text="完成"
                 left-arrow
                 class="page-nav-bar"
                 @click-left="$emit('close',false)"
                 @click-right="onClickRight" />
    <van-field v-model.trim="message"
               rows="2"
               autosize
               label="留言"
               type="textarea"
               maxlength="7"
               placeholder="请输入用户昵称"
               show-word-limit />
  </div>
</template>

<script>
import { updateUserName } from '@/api/userInfo.js'

export default {
  name: 'Username',
  data () {
    return {
      message: this.UserName
    }
  },
  props: {
    UserName: {
      type: String,
      required: true
    }
  },
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (!this.message.length) {
          return this.$toast.fail('请输入用户昵称')
        }
        await updateUserName({
          name: this.message
        })
        this.$toast.success('修改昵称成功！')
        this.$emit('close')
        this.$emit('update-username', this.message)
      } catch (e) {
        this.$toast.fail('修改昵称失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.username-container {
  .van-nav-bar {
    margin-bottom: 26px;
  }
}
</style>
