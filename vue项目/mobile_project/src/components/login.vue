<template>
  <div class="login_container">
    <van-nav-bar class="page-nav-bar"
                 left-text="返回"
                 @click-left='$router.back()'
                 title="登录" />
    <van-form @submit="onSubmit"
              ref="loginFormRef">
      <van-field v-model="user.mobile"
                 name="mobile"
                 placeholder="请输入手机号"
                 type="number"
                 maxlength="11"
                 :rules="logonFormRule.mobile">
        <i slot="left-icon"
           class="iconfont iconshouji"></i>
      </van-field>
      <van-field v-model="user.code"
                 name="code"
                 placeholder="请输入验证码"
                 type="number"
                 maxlength="6"
                 :rules="logonFormRule.code">
        <i slot="left-icon"
           class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*5"
                          v-if="isShowSendSmsBtn"
                          @finish='showSmsBtn'
                          format="ss s后重新发送" />
          <van-button size="small"
                      type="primary"
                      class="send-btn"
                      v-else
                      @click="changeSmsBtn"
                      native-type="button"
                      round>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login_btn_warp">
        <van-button block
                    type="info"
                    native-type="submit"
                    class="login_btn">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13111111111',
        code: '246810'
      },
      logonFormRule: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号码' }],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ]
      },
      isShowSendSmsBtn: false
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        // console.log(data.data)
        this.$toast.success('登录成功')
        this.$store.commit('setToken', data.data)
        this.$router.back()
      } catch (e) {
        // console.log(e)
        if (e.response.status === 400) { this.$toast.fail('登录失败') } else {
          this.$toast.fail('登录失败请稍后再试')
        }
      }
    },
    async changeSmsBtn () {
      try {
        await this.$refs.loginFormRef.validate('mobile')
        // console.log('发送成功')
      } catch (e) {
        return this.$toast.fail('发送失败,请稍后再试!')
      }
      this.isShowSendSmsBtn = true
      try {
        await sendSms(this.user.mobile)
      } catch (e) {
        if (e.response.status === 429) {
          return this.$toast.fail('发送太频繁了请稍后再试')
        }
        return this.$toast.fail('请稍后再试', e)
      }
    },
    showSmsBtn () {
      this.isShowSendSmsBtn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  .iconfont {
    font-size: 37px;
  }
  .login_btn_warp {
    padding: 53px 33px;
    .login_btn {
      background-color: #6db4fbff;
      border: 0;
    }
  }
  .send-btn {
    width: 152px;
    height: 46px;
    background: #ededed;
    color: #666666;
    font-size: 22px;
    line-height: 36px;
    border: 0;
  }
}
</style>
