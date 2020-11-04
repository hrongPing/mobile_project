<template>
  <div>
    <van-picker title="标题"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                :default-index="value"
                @cancel="$emit('close')"
                @change="onChange" />
  </div>
</template>

<script>
import { updateUserName } from '@/api/userInfo.js'
export default {
  name: 'UserGender',
  data () {
    return {
      columns: ['男', '女'],
      index: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const index = this.index
        await updateUserName({
          gender: index
        })
        this.$emit('input', index)
        this.$emit('close')
        this.$toast.success('修改性别成功!')
      } catch (e) {
        this.$toast.fail('修改性别失败!')
      }
    },
    onChange (picker, value, index) {
      this.index = index
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
