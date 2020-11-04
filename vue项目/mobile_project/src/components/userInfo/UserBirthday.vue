<template>
  <div>
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         title="选择年月日"
                         :min-date="minDate"
                         @cancel="$emit('close')"
                         @confirm='updateUserBirthday'
                         :max-date="maxDate" />
  </div>
</template>

<script>
import { updateUserName } from '@/api/userInfo.js'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async updateUserBirthday () {
      try {
        await updateUserName({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
        this.$emit('close')
        this.$toast.success('修改生日成功！')
      } catch (e) {
        this.$toast.fail('修改生日失败！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
