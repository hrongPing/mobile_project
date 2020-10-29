<template>
  <div class="channel-edit">
    <van-cell :border="false"
              class="title-text">
      <div slot="title"
           class="title">我的频道</div>
      <van-button type="danger"
                  plain
                  @click="isEdit=!isEdit"
                  size="mini"
                  round>{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(value,index) in channelEdit"
                     :key="index"
                     @click="editRecommend(value,index)"
                     class="channel-list">
        <span slot="text"
              class="van-grid-item__text"
              :class="channelActive===index?'active':''">{{value.name}}</span>
        <van-icon slot="icon"
                  v-show="isEdit&&!recommend.includes(value.id)"
                  name="clear"></van-icon>
      </van-grid-item>
    </van-grid>
    <van-cell :border='false'
              class="title-text">
      <div slot="title"
           class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(value,index) in recommendChannel"
                     :key="index"
                     icon="plus"
                     :text="value.name"
                     @click="addRecommend(value)" />
    </van-grid>
  </div>
</template>

<script>
import { allChannelList, addUserChannel, deleteUserChannel } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      isEdit: false,
      allChannelList: [],
      recommend: [0]
    }
  },
  props: {
    channelEdit: {
      type: Array,
      required: true
    },
    channelActive: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllChannelList()
  },
  methods: {
    async getAllChannelList () {
      try {
        const { data } = await allChannelList()
        console.log(data)
        this.allChannelList = data.data.channels
      } catch (e) {
        this.$toast.fail('读取数据失败')
      }
    },
    async addRecommend (value) {
      this.channelEdit.push(value)
      if (this.user) {
        try {
          await addUserChannel([{
            id: value.id,
            seq: this.channelEdit.length
          }])
        } catch (e) {
          this.$toast.fail('添加频道失败')
        }
      } else {
        setItem('TOUTIAO-CHANNEL', this.channelEdit)
      }
    },
    async editRecommend (value, index) {
      try {
        if (this.recommend.includes(value.id)) {
          return
        }
        if (this.isEdit) {
          if (index < this.channelActive) {
            this.$emit('editChannel', this.channelActive - 1)
          }
          this.channelEdit.splice(index, 1)
        } else {
          this.$emit('editChannel', index, false)
        }
        if (this.user) {
          await deleteUserChannel(value.id)
        } else {
          setItem('TOUTIAO-CHANNEL', this.channelEdit)
        }
      } catch (e) {
        this.$toast.fail('删除数据失败')
      }
    },
    localChannel (value) {
      if (!this.user) {

      }
    }
  },
  computed: {
    recommendChannel () {
      return this.allChannelList.filter(v1 => {
        return !this.channelEdit.find(v2 => {
          return v1.id === v2.id
        })
      })
    },
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.channel-edit {
  .van-button--plain.van-button--danger {
    color: #ee0a24;
    width: 80px;
    height: 40px;
    line-height: 40px;
  }
  .title-text {
    margin-bottom: 24px;
    margin-top: 75px;
    .title {
      font-size: 32px;
      color: #333;
    }
  }
  ::v-deep .van-grid {
    .van-grid-item__text {
      font-size: 28px;
      color: #222222;
      margin-top: 0;
    }
    .channel-list {
      width: 80px * 2;
      height: 43px * 2;
      .van-icon {
        position: absolute;
        right: -7px * 2;
        top: -7px * 2;
        color: #cacaca;
        font-size: 32px !important;
        z-index: 2;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
    .van-grid-item__content {
      display: flex;
      flex-direction: row;
      background: #f4f5f6;
      white-space: nowrap;
      .van-icon {
        font-size: 28px;
        margin-bottom: 3px;
      }
    }
    .van-grid-item {
      width: 91px * 2;
      height: 43px * 2;
    }
  }
  .active {
    color: red !important;
  }
}
</style>
