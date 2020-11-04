<template>
  <div>
    <van-nav-bar title="个人信息"
                 left-arrow
                 class="page-nav-bar"
                 @click-left="$router.back()"></van-nav-bar>
    <input type="file"
           hidden
           @change="onFileChange"
           ref="imgs">
    <van-cell title="头像"
              class="avatar"
              @click="onFileClick"
              is-link>
      <van-image class="user_avatar"
                 fit="cover"
                 round
                 :src="user.photo" />
    </van-cell>
    <van-cell title="昵称"
              is-link
              @click="isUserNameShow=true"
              :value="user.name">
    </van-cell>
    <van-cell title="性别"
              is-link
              @click="isUserGenderShow=true"
              :value="user.gender?'女':'男'"></van-cell>
    <van-cell title="生日"
              is-link
              @click="isUserBirthdayShow=true"
              :value="user.birthday"></van-cell>
    <van-popup v-model="isUserNameShow"
               position="bottom"
               class="username_wrap"
               :style="{ height: '100%' }">
      <user-name @close='isUserNameShow=$event'
                 v-if="isUserNameShow"
                 :UserName='user.name'
                 @update-username='user.name=$event'></user-name>
    </van-popup>
    <van-popup v-model="isUserGenderShow"
               position="bottom"
               class="username_wrap">
      <user-gender v-model="user.gender"
                   v-if="isUserGenderShow"
                   @close='isUserGenderShow=false'></user-gender>
    </van-popup>
    <van-popup v-model="isUserBirthdayShow"
               position="bottom"
               class="username_wrap">
      <user-birthday v-model="user.birthday"
                     @close='isUserBirthdayShow=false'></user-birthday>
    </van-popup>
    <van-popup v-model="isUserAvatarShow"
               position="bottom"
               style="height:100%"
               class="username_wrap">
      <user-avatar :img='imgs'
                   @update-avatar='user.photo=$event'
                   @close='isUserAvatarShow=false'></user-avatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/userInfo.js'
import UserName from '@/components/userInfo/UserName.vue'
import UserGender from '@/components/userInfo/UserGender.vue'
import UserBirthday from '@/components/userInfo/UserBirthday.vue'
import UserAvatar from '@/components/userInfo/UserAvatar.vue'
export default {
  name: 'userInfo',
  data () {
    return {
      user: {},
      isUserNameShow: false,
      isUserGenderShow: false,
      isUserBirthdayShow: false,
      isUserAvatarShow: false,
      imgs: null
    }
  },
  created () {
    this.loadUserInfo()
  },
  components: {
    UserName,
    UserGender,
    UserBirthday,
    UserAvatar
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.user = data.data
      } catch (e) {
        this.$toast.fail('获取用户信息失败')
      }
    },
    onFileClick () {
      this.$refs.imgs.click()
    },
    onFileChange () {
      this.isUserAvatarShow = true
      const file = this.$refs.imgs.files[0]
      this.imgs = window.URL.createObjectURL(file)
      this.$refs.imgs.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  .user_avatar {
    width: 60px;
    height: 60px;
  }
}
.username_wrap {
  background-color: #f5f7f9;
}
</style>
