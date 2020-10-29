<template>
  <div>
    <van-cell class="article-item"
              :to="{
                name:'article',
                params:{
                  id:this.article.art_id
                }
              }">
      <div slot="title"
           class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot="label"
           class="label">
        <div v-if="article.cover.type===3">
          <div class="cover">
            <van-image fit="cover"
                       v-for="(v,i) in article.cover.images "
                       :key="i"
                       class="cover-item"
                       :src="v" />
          </div>
        </div>
        <div class="label-info">
          <span>{{article.aut_name}}</span>
          <span>{{article.comm_count}}评论</span>
          <span>{{article.pubdate | dateformat}}</span>
        </div>
      </div>
      <van-image fit="cover"
                 v-if="article.cover.type===1"
                 class="right-img"
                 :src="article.cover.images[0]" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  data () {
    return {

    }
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-img {
    width: 232px;
    height: 146px;
  }
  .cover {
    display: flex;
    .cover-item {
      padding: 0 2px;
      width: 232px;
      height: 146px;
    }
  }
  .label-info span {
    margin-right: 25px;
    font-size: 22px;
    color: #b4b4b4;
  }
  .van-cell__label {
    margin-top: 43px;
  }
}
</style>
