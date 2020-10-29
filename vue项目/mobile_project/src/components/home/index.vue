<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar"
                 fixed>
      <van-button icon="search"
                  class="search_btn"
                  type="info"
                  slot="title"
                  size="small"
                  round
                  to="/search"
                  text="搜索"></van-button>
    </van-nav-bar>
    <van-tabs swipeable
              animated
              class="page-van-tabs"
              v-model="active">
      <van-tab :title="v.name"
               v-for="v in list"
               :key="v.id">
        <Article :channel='v'></Article>
      </van-tab>
      <div slot="nav-right"
           class="placeholder"></div>
      <div slot="nav-right"
           class="hunberger_btn"
           @click="isChannelShow=true">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <van-popup v-model="isChannelShow"
               closeable
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '100%' }">
      <ChannelEdit :channelEdit='list'
                   @editChannel='editChannel'
                   :channelActive='active'></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getchannel } from '@/api/user.js'
import Article from '@/components/article/Article.vue'
import ChannelEdit from '@/components/article/ChannerEdit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'

export default {
  data () {
    return {
      active: 0,
      list: [],
      isChannelShow: false
    }
  },
  created () {
    this.getchannelList()
  },
  methods: {
    async getchannelList () {
      let channels = []
      if (this.user) {
        const { data } = await getchannel()
        // console.log(data)
        channels = data.data.channels
      } else {
        const loaclChannel = getItem('TOUTIAO-CHANNEL')
        if (loaclChannel) {
          channels = loaclChannel
        } else {
          const { data } = await getchannel()
          channels = data.data.channels
        }
      }
      this.list = channels
    },
    // 子传父，结构里面定义的函数不用传参数
    editChannel (index, isChannelShow = true) {
      this.active = index
      this.isChannelShow = isChannelShow
    }
  },
  components: {
    Article,
    ChannelEdit,
    ...mapState
  }
}
</script>

<style lang="scss" >
.home-container {
  padding-top: 174px;
  .page-nav-bar {
    .van-nav-bar__title {
      max-width: unset;
    }
    .search_btn {
      width: 555px;
      height: 64px;
      .van-icon {
        font-size: 32px;
        color: #ffffff;
      }
      .van-button__text {
        font-size: 28px;
      }
    }
  }
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 99;
    left: 0;
    right: 0;
  }
  .page-van-tabs {
    .van-tab {
      width: 191px;
      height: 82px;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background: #3296fa;
      border-radius: 3px;
      margin-bottom: 8px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hunberger_btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 81px;
      background: #ffffff;
      opacity: 0.9;
      border-bottom: 1px solid #edeff3;
      .iconfont {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background: url("../../assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
  .van-list {
    padding-bottom: 100px;
  }
}
</style>
