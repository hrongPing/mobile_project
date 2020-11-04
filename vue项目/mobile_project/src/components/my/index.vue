<template>
  <div>
    <div class="header not_login"
         v-if="!user">
      <img class="avatar"
           src="../../assets/mobile.png" />
      <span class="login_btn"
            @click="pushLogin">未登录/注册</span>
    </div>
    <div class="header login"
         v-else>
      <div class="header_top">
        <div class="top_left">
          <van-image class="avatar_login"
                     round
                     :src="userInfo.photo" />
          <span class="login_btn">{{userInfo.name}}</span>
        </div>
        <div class="top_right">
          <van-button size="mini"
                      to="/userInfo"
                      round>编辑资料</van-button>
        </div>
      </div>
      <div class="header_bottom">
        <div class="info">
          <span class="first">{{userInfo.art_count}}</span><span class="last">头条</span>
        </div>
        <div class="info">
          <span class="first">{{userInfo.like_count}}</span><span class="last">关注</span>
        </div>
        <div class="info">
          <span class="first">{{userInfo.fans_count}}</span><span class="last">粉丝</span>
        </div>
        <div class="info">
          <span class="first">{{userInfo.like_count}}</span><span class="last">获赞</span>
        </div>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <i slot="icon"
           class="iconfont iconshoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon"
           class="iconfont iconlishi"></i>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知"
              is-link />
    <van-cell title="小智同学"
              is-link />
    <van-button class="logou_btn"
                v-if="user"
                size="large"
                @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { loadUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    const { data } = await loadUserInfo()
    // console.log(data.data)
    this.userInfo = data.data
  },
  methods: {
    pushLogin () {
      this.$router.push('/login')
    },
    logout () {
      this.$dialog.confirm({
        title: '确定要退出吗'
      })
        .then(() => {
          this.$store.commit('setToken', null)
        })
        .catch(() => {
          this.$toast.success('已取消')
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 750px;
  height: 400px;
  background: url(~@/assets/banner.png);
  background-size: cover;
  .avatar {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
  }
  .avatar_login {
    width: 132px;
    height: 132px;
    margin-bottom: 15px;
    margin-right: 22px;
    border: 4px solid #ffffff;
  }
  .login_btn {
    font-size: 30px;
    color: #fff;
  }
}
.not_login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login {
  .header_top {
    height: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_left {
      margin-left: 32px;
      display: flex;
      align-items: center;
    }
    .top_right {
      margin-right: 33px;
    }
  }
  .header_bottom {
    height: 150px;
    display: flex;
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .first {
        font-size: 30px;
      }
      .last {
        font-size: 23px;
      }
    }
  }
}
.iconfont:nth-child(1) {
  color: #eb5253;
  font-size: 45px;
}
.iconfont:nth-child(2) {
  color: #ff9d1d;
  font-size: 45px;
}
.van-grid {
  margin-bottom: 10px;
}
.logou_btn {
  margin-top: 10px;
  color: #d86262;
  font-size: 30px;
}
</style>
