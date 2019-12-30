<!-- 公共底部 -->
<template>
  <div id="bottomContainer">
    <div class="bottomItem" :class="{active: '/home'===$route.path}" @click="toPage('/home')">
      <div class="img">
        <van-icon name="wap-home-o" />
      </div>
      <div class="text">钱包</div>
    </div>
    <div class="bottomItem" :class="{active: '/'===$route.path}" @click="toPage('/')">
      <div class="img">
        <van-icon name="contact" />
      </div>
      <div class="text">我的</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicBottom',
  data() {
    return {

    }
  },
  methods:{
    toPage(path) {
      conosle.log(path)
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less">
#bottomContainer{
  z-index: 99rem;
  height: 1.3rem;
  background: #f9f8f8;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .bottomItem {
    float: left;
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: center;
    &.active{
      color: #0000FF;
    }
    .img{
      padding-top: .05rem;
      font-size: .5rem;
    }
    .text{
      padding-top: .05rem;
      font-size: .4rem;
    }
  }
}
</style>
