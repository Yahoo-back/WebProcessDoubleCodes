<template>
  <div id="app">
    <!-- <PublicBottom v-show="$route.meta.showBottom"/> -->
    <PublicTop v-show="$route.meta.showTop"/>
    <router-view/>
  </div>
</template>
<script>
// import PublicBottom from './pages/Public/PublicBottom.vue'
import PublicTop from './pages/Public/PublicTop.vue'
export default {
  name: 'App',
  components: {
    // PublicBottom,
    PublicTop
  }
}
</script>
<style lang="less">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
</style>



