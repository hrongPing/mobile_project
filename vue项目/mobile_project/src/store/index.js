import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('toutiao_user'),
    commentList: [],
    commentItem: {},
    isPopShow: false,
    artId: 0
  },
  mutations: {
    setToken (state, token) {
      state.user = token
      setItem('toutiao_user', state.user)
    },
    getCommentList (state, list) {
      state.commentList = list
    },
    getCommentItem (state, form) {
      state.commentItem = form
    },
    isPopupShow (state) {
      state.isPopShow = !state.isPopShow
    },
    getArtId (state, ArticleId) {
      state.artId = ArticleId
    }
  },
  actions: {
  },
  modules: {
  }
})
