<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-cell>
      <van-image slot="icon"
                 round
                 width="30"
                 height="30"
                 style="margin-right: 10px;"
                 :src="comment.aut_photo" />
      <span style="color: #466b9d;"
            slot="title">{{comment.aut_name}}</span>
      <div slot="label">
        <p style="color: #363636;">{{comment.content}}</p>
        <p>
          <span style="margin-right: 10px;">{{comment.pubdate | dateformat}}</span>
          <van-button size="mini"
                      @click="isRepShow"
                      type="default">回复{{comment.reply_count}}</van-button>
        </p>
      </div>
      <van-button slot="right-icon"
                  :class="{like:comment.is_liking}"
                  :loading='isloding'
                  @click="isLikeComment"
                  :icon="comment.is_liking?'good-job':'good-job-o'">
        {{comment.like_count || '赞'}}
      </van-button>
    </van-cell>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable
                 placeholder="请输入评论内容">
        <van-button slot="button"
                    size="mini"
                    type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { likeComment, delLikeComment } from '@/api/comment.js'
// import { mapState } from 'vuex'

export default {
  name: 'ArtComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isloding: false,
      popShow: this.isPopShow,
      stepMap: 0,
      commentItem1: {}
    }
  },
  computed: {
    // ...mapState(['commentItem'])
  },
  created () {

  },
  // watch: {
  //   commentItem: {
  //     handler (newval, oldval) {
  //       this.commentItem1 = newval
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    async isLikeComment () {
      this.isloding = true
      try {
        if (this.comment.is_liking) {
          await delLikeComment(this.comment.com_id)
          this.comment.like_count--
        } else {
          await likeComment(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (e) {

      }
      this.isloding = false
    },
    isRepShow () {
      this.$store.commit('getCommentItem', this.comment)
      this.$store.commit('isPopupShow')
    }
  }

}
</script>

<style scoped lang="scss">
.van-button--normal {
  border: 1px solid transparent;
  .van-button__icon {
    font-size: 28px;
  }
  .van-button__text {
    font-size: 22px;
  }
}
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.like {
  color: red !important;
}
.van-list {
  margin-bottom: 45px;
}
</style>
