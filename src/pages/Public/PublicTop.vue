<!-- 公共头部 -->
<template>
  <div id="topContainer">
    <div class="spaceDiv"></div>
    <div class="topItem">
      <div class="img">
        <van-icon name="arrow-left" @click="goBack()" />
        <van-icon name="cross" />
        <!-- <img src="../../assets/image/mjagree.png"/> -->
      </div>
    </div>
    <div class="title">火分期</div>
    <div class="topItem"></div>
  </div>
</template>

<script>
export default {
  name: 'PublicTop',
  data() {
    return {

    }
  },
  methods:{
    goBack() {
      if(this.$router.currentRoute.path == '/verification'){
        return
      }else{
        this.$router.back(-1);
      }
      // console.log(this.$router.currentRoute.path == '/verification')
      //   this.$router.back(-1);
    }
  }
}
</script>

<style lang="less">
#topContainer{
  z-index: 99rem;
  height: 1.3rem;
  background: #f9f8f8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  .title {
    padding-top: .4rem;
  }
  .topItem {
    float: left;
    display: flex;
    flex-direction: column;
    width: 33.33%;
    text-align: center;
    &.active{
      color: #0000FF;
    }
    .img{
      padding-top: .4rem;
      font-size: .5rem;
      margin-left: -100px;
    }
  }
}
</style>
