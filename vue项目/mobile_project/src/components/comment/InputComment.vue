<template>
  <div class="comment-post">
    <van-field class="post-field"
               v-model.trim="message"
               rows="2"
               autosize
               type="textarea"
               maxlength="50"
               placeholder="请输入留言"
               show-word-limit />
    <van-button class="post-btn"
                :disabled='!message'
                @click="pubCommentCount">发布</van-button>
  </div>
</template>

<script>
import { publishComment } from '@/api/comment.js'
import { mapState } from 'vuex'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState(['commentList', 'artId'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async pubCommentCount () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await publishComment({
          target: this.articleId.toString(),
          content: this.message,
          art_id: this.artId ? this.artId.toString() : this.artId
        })
        // console.log(data.data.new_obj.content)
        console.log(data)
        this.commentList.unshift(data.data.new_obj)
        this.$emit('close-popup', false)
        this.message = ''
        this.$toast.success('发布成功！')
      } catch (e) {
        this.$toast.fail('发布失败,请稍后再试!')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
