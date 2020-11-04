<template>
  <div class="reply-comment">
    <van-nav-bar>
      <div slot="title">{{commentItem.reply_count===0?'暂无回复':commentItem.reply_count+'条回复'}}</div>
      <van-icon name="cross"
                @click="isRepShow"
                slot="left" />
    </van-nav-bar>
    <div class="reply_wrap">
      <CommentItem :comment="commentItem"></CommentItem>
      <van-cell title="全部回复"></van-cell>
      <Comment :type="'c'"
               :sourceId="commentItem.com_id"></Comment>
    </div>
    <div class="reply-write">
      <van-button round
                  @click="isPopshow"
                  size="small">写评论</van-button>
    </div>
    <van-popup v-model="isShow"
               position="bottom">
      <InputComment :articleId="commentItem.com_id"
                    @close-popup='onPostSuccess'></InputComment>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from '@/components/comment/Comment.vue'
import CommentItem from '@/components/comment/CommentItem.vue'
import InputComment from '@/components/comment/InputComment.vue'

export default {
  name: 'Repcomment',
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState(['isPopShow', 'commentItem'])
  },
  components: {
    Comment,
    CommentItem,
    InputComment
  },
  methods: {
    isRepShow () {
      this.$store.commit('isPopupShow')
    },
    isPopshow () {
      this.isShow = true
    },
    onPostSuccess (value) {
      this.isShow = value
      this.commentItem.reply_count++
    }
  }

}
</script>

<style lang="scss" scoped>
.van-icon {
  color: #1989fa !important;
}
.reply-write {
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 88px;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .van-button {
    width: 60%;
  }
}
.reply_wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
</style>
