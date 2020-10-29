import { mapState } from 'vuex';
<template>
  <div>
    <router-view></router-view>
    <van-tabbar router
                v-model="active"
                class="layout-tabbar">
      <van-tabbar-item to='/'>首页
        <i slot="icon"
           class="iconfont iconshouye"></i>
      </van-tabbar-item>
      <van-tabbar-item to='/qa'>问答
        <i slot="icon"
           class="iconfont iconwenda"></i>
      </van-tabbar-item>
      <van-tabbar-item to='/videw'>视频
        <i slot="icon"
           class="iconfont iconshipin"></i>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>{{user?'我的':'未登录'}}
        <i slot="icon"
           class="iconfont iconwode"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.layout-tabbar {
  .iconfont {
    font-size: 40px;
  }
}
</style>
