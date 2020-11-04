<template>
  <div class="article-container markdown-body">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 left-arrow
                 @click-left="$router.back()"
                 title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap"
           v-if="isLoading">
        <van-loading color="#3296fa"
                     vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail"
           v-else-if="articleForm.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleForm.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info"
                  center
                  :border="false">
          <van-image class="avatar"
                     slot="icon"
                     round
                     fit="cover"
                     src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div slot="title"
               class="user-name">{{articleForm.aut_name}}</div>
          <div slot="label"
               class="publish-date">{{articleForm.pubdate | dateformat}}</div>
          <follow-btn :followBtn='articleForm'></follow-btn>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content"
             ref="article-content"
             v-html="articleForm.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn"
                      type="default"
                      round
                      @click="show = true"
                      size="small">写评论</van-button>
          <van-icon name="comment-o"
                    :badge="totalComment"
                    color="#777" />
          <collect-btn :isCollet='articleForm.is_collected'
                       :articlId='articleForm.art_id'
                       @collectArt='articleForm.is_collected=$event'></collect-btn>
          <like-btn v-model="articleForm.attitude"
                    :likeArtId='articleForm.art_id'></like-btn>
          <van-icon name="share"
                    color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <comment :sourceId='articleForm.art_id'
                 @totalCount='totalComment=$event.total_count'></comment>
        <van-popup v-model="show"
                   position="bottom">
          <input-comment :articleId='articleForm.art_id'
                         @close-popup='show=$event'></input-comment>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap"
           v-else-if="errStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap"
           v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
                    @click="loadgetArtContainer">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <van-popup v-model="isPopShow1"
               position="bottom"
               :style="{ height: '100%' }">
      <reply-comment v-if="isPopShow1"></reply-comment>
    </van-popup>
  </div>
</template>

<script>
import { getArtContainer } from '@/api/article.js'
import { ImagePreview } from 'vant'
import followBtn from '@/components/followBtn.vue'
import collectBtn from '@/components/Collectbtn.vue'
import LikeBtn from '@/components/LikeBtn.vue'
import Comment from '@/components/comment/Comment.vue'
import InputComment from '@/components/comment/InputComment.vue'
import ReplyComment from '@/components/comment/ReplyComment.vue'
import { mapState } from 'vuex'

export default {
  name: 'ArticleIndex',
  props: {
    id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      articleForm: {},
      isLoading: true,
      errStatus: 0,
      show: false,
      totalComment: 0,
      replyShow: false,
      isPopShow1: false
    }
  },
  components: {
    followBtn,
    collectBtn,
    LikeBtn,
    Comment,
    InputComment,
    ReplyComment
  },
  computed: {
    ...mapState(['isPopShow'])
  },
  watch: {
    isPopShow (newval, oldval) {
      this.isPopShow1 = newval
    }
  },
  created () {
    this.loadgetArtContainer()
  },
  methods: {
    async loadgetArtContainer () {
      try {
        const { data } = await getArtContainer(this.id)
        // if (Math.random() > 0.5) {
        //   throw new Error()
        // }
        this.articleForm = data.data
        this.$store.commit('getArtId', this.articleForm.art_id)
        setTimeout(() => {
          this.getImagePreview()
        }, 0)
      } catch (e) {
        if (e.responsee && e.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.isLoading = false
    },
    getImagePreview () {
      const images = []
      const article = this.$refs['article-content']
      const imgs = article.querySelectorAll('img')
      // console.log(imgs)
      imgs.forEach((v, i) => {
        images.push(v.src)
        v.onclick = () => {
          ImagePreview({
            images,
            startPosition: i
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "./markdown.css";
.article-container {
  ::v-deep .van-nav-bar .van-icon {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      ::v-deep p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  ::v-deep .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
