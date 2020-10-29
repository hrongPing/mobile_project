<template>
  <div class="article-container">
    <van-pull-refresh v-model="isLoading"
                      :success-text='successTips'
                      success-duration='1500'
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad">
        <Articleitem v-for="(item,index) in list"
                     :article='item'
                     :key="index"></Articleitem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/user'
import Articleitem from '@/components/article/Article-item.vue'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      successTips: '刷新成功'
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        // console.log(data)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        // console.log(data)
        this.successTips = `成功刷新了${results.length}条数据`
        this.isLoading = false
        // if (Math.random() > 0) {
        //   throw new Error()
        // }
      } catch (error) {
        this.isLoading = false
        this.successTips = '刷新失败'
      }
    }
  },
  components: {
    Articleitem
  }
}

</script>

<style lang="scss" scoped>
.article-container {
  height: 80vh;
  overflow-y: auto;
}
</style>
