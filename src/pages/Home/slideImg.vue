<!-- 验证 -->
<template>
  <div>
		<div id="img">
			<img src="../../assets/image/banner.png">
			<div id="img1" v-if="show">
				<img src="../../assets/image/img1.png">
			</div>
			<div id="img2" v-if="show1" >
				<img src="../../assets/image/img2.png">
			</div>
			<div id="img3" v-if="show2" >
				<img src="../../assets/image/img3.png" >
			</div>
			<div id="img4" v-if="show3">
				<img src="../../assets/image/img4.png">
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'slideImg',
  data() {
    return {
			show: false,
			show1: false,
			show2: false,
			show3: false,
    }
	},
	created () {
		var uuid = sessionStorage.getItem('uuid')
    var bankNo = sessionStorage.getItem('bankNo')
    var bankName = sessionStorage.getItem('bank')
		var bankPhone =  sessionStorage.getItem('bankPhone')
		// console.log(uuid);
		// console.log(bankNo);
		// console.log(bankName);
		// console.log(bankPhone);
    this.intervalId = setInterval(() => {
      this.show = true;
    }, 500)
    this.intervalId = setInterval(() => {
      this.show1 = true;
		}, 1500)
		this.intervalId = setInterval(() => {
      this.show2 = true;
		}, 2500)
		this.intervalId = setInterval(() => {
      this.show3 = true;
		}, 3500)
		this.intervalId = setInterval(() => {
			this.$router.push('/verification')
    }, 4500)
},

  methods:{
  }
}

</script>

<style lang="less">
    img {
				width: 100%;
				height: 100%;
			}
			#img1 {
				width: 90%;
				margin-left: 5%;
				// display: none;
				margin-top: 20px;
			}
			#img2 {
				width: 90%;
				margin-left: 5%;
				// display: none;
				margin-top: 25px;
			}
			#img3 {
				width: 90%;
				margin-left: 5%;
				// display: none;
				margin-top: 25px;
			}
			#img4 {
				width: 90%;
				margin-left: 5%;
				// display: none;
				margin-top: 25px;
			}
</style>
