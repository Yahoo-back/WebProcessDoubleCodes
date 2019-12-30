<!--下载链接页 -->
<template>
  <div>
		<div class="banner">
    	<img src="../../assets/image/mcBanner.png">
    </div>
    <div class="success">
      <div class="pof">
        <img src="../../assets/image/alert_bg.png" class="bg" alt="">
        <img src="../../assets/image/ios_guide.png" alt="" class="iosGuide">
      </div>
      <ul>
        <li>
          <a id="iosDownload" class="fr" @click="iosDownLoad">
          	<img src="../../assets/image/iphone.png" class="iosImages">
          </a>
        </li>
        <li>
          <a id="androidDownload" class="fl" @click="androidDownLoad">
            <img src="../../assets/image/android.png" class="andriodImages">
          </a>
        </li>
      </ul>
    </div>
    <div class="layer"></div>
    <div class="layer2"></div>
  </div>
</template>

<script>
export default {
  name: 'downLoad',
  data() {
    return {
			iosUrl: 'https://cw.pub/sEKD',
			androidUri: 'https://cw.pub/sEKD'
    }
	},
	created () {
},

  methods:{
		iosDownLoad(){
			window.location.href= this.iosUrl
		},
		androidDownLoad(){
				window.location.href= this.androidUri
		}
  }
}

</script>

<style lang="less">
@import '../../assets/style/style.css';
</style>
