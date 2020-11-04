<template>
  <div class="user-avatar">
    <img :src="img"
         class="img"
         ref="img">
    <div class="toolbar">
      <div class="cancel"
           @click="$emit('close')">取消</div>
      <div class="confirm"
           @click="onConfirm">确认</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updataUserPhoto } from '@/api/userInfo.js'
export default {
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm () {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          const { data } = await updataUserPhoto(formData)
          console.log(data)
          this.$emit('update-avatar', data.data.photo)
          this.$emit('close')
          this.$toast.success('更新头像成功！')
        } catch (e) {
          this.$toast.fail('更新头像失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  background-color: black;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      display: flex;
      width: 90px;
      height: 90px;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #fff;
    }
  }
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>
