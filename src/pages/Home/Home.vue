<!-- 首页 -->
<template>
  <div class="homeContainer">
    <div class="topSlot"></div>
    <div class="navTop">
      <div class="iconImg">
        <van-icon name="arrow-left" size="18px" @click="goBack()" />
      </div>
      <h3>首页</h3>
      <span></span>
    </div>
    <div class="notice">
      <van-notice-bar
        color="#5940ff"
        background="#fff"
        left-icon="volume-o"
        :scrollable="false"
        class="noticeL"
      >
      借款速报
      </van-notice-bar>
      <van-swipe class="noticeR" :autoplay="3000" :show-indicators="false" vertical>
        <van-swipe-item>用户152****3684已成功借款</van-swipe-item>
        <van-swipe-item>用户183****0014已成功借款</van-swipe-item>
        <van-swipe-item>用户181****8062已成功借款</van-swipe-item>
        <van-swipe-item>用户138****8754已成功借款</van-swipe-item>
        <van-swipe-item>用户188****3651已成功借款</van-swipe-item>
        <van-swipe-item>用户150****5273已成功借款</van-swipe-item>
      </van-swipe>
    </div>
    <div class="homeContent">
      <div class="yuan">我想借(元)</div>
      <div class="money">{{this.values}}</div>
       <!-- <div class="bar">
        <van-progress stroke-width="8" show-pivot="false" />
      </div> -->
      <div class="bar">
        <van-slider v-model="value" @change="onChange" bar-height="10px" active-color="#5c43ff" :min="15" :max="100" />
      </div>
      <div class="quota">
        <span>3000</span>
        <span>20000</span>
      </div>
      <div class="mouth">
        <van-button class="buttonm1" v-for='(item,index) in mouths' :key="index"  @click="getMouth(index)" :class="{active: index===mouthNum}">{{item}}</van-button>
        <!-- <van-button class="buttonm1" >1个月</van-button>
        <van-button class="buttonm3">3个月</van-button>
        <van-button class="buttonm6">6个月</van-button> -->
      </div>
      <div class="loan" @click="toPage()">
        <van-button class="button" size="large">激活额度</van-button>
      </div>
      <div class="study">
        不向学生提供服务
      </div>
      <img class="bImg" src="../../assets/image/indexBottom.png"/>
      <!-- <div class="introduction">
        <div class="introdutionItem">
          <van-icon name="cash-on-deliver" />
          <p>急速审核</p>
        </div>
        <div class="introdutionItem">
          <van-icon name="cash-on-deliver" />
          <p>超长期限</p>
        </div>
        <div class="introdutionItem">
          <van-icon name="cash-on-deliver" />
          <p>实时放款</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import * as api from '../../SystemService'
export default {
	name: 'Home',
	data() {
		return {
      mouths: ['一个月','三个月','六个月'],
      mouthNum: 1,
      value: 50,
      values: 10000,
      uuid: '',
		}
  },
  mounted () {
    var uuid = sessionStorage.getItem('uuid')
    this.uuid = uuid;
  },
  methods:{
    GetQueryString(name) {
        var c = decodeURIComponent(location.search);
        var theRequest = new Object();
        if (c.indexOf("?") != -1) {
            var str = c.substr(1);
            var strs = str.split("&");
            for ( var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    getMouth(index) {
      this.mouthNum = index;
    },
    onChange(value) {
			this.values = value*200
    },
    toPage() {
      // Request = this.GetQueryString();
      // var uuid = Request["uuid"];
      // this.uuid = uuid; 
      // console.log(this.uuid)
      api.userAuthStatus({
        cmd: "userAuthStatus",
        token: '',
        version: '1.0',
        params: {uuid: this.uuid}})
        .then(res => {
          if(res.data.result == 0) {
            var userAuthStatus = res.data.detail.userAuthStatus;
            var name = res.data.detail.name;
            var type = res.data.detail.type;
            var idCard = res.data.detail.idCard;
            sessionStorage.setItem('userAuthStatus',userAuthStatus)
            sessionStorage.setItem('name',name)
            sessionStorage.setItem('type',type)
            sessionStorage.setItem('idCard',idCard)
            if(userAuthStatus == 0){
              this.$router.push('/review')
            }else if(userAuthStatus == 1){
              this.$router.push('/review')
            }else if(userAuthStatus == 2){
              this.$router.push('/review')
            }else if(userAuthStatus == 3){
              //支付
              this.$router.push('/verification')
            }else if(userAuthStatus == 4){
              this.$router.push('/downLoad')
            }else{
              this.$toast(res.data.resultNote);
            }
          }else{
              this.$toast(res.data.resultNote);
          }
        })
    },
    goBack() {
      this.$router.back(-1);
    }
  }
}
</script>
<style lang="less">
.van-notice-bar__wrap{
  overflow: visible;
}
.homeContainer{
  display: flex;
  flex-direction: column;
  width: 100%;
  .topSlot{
      height: 50px;
  }
  .navTop{
    display: flex;
    justify-content: space-around;
    .iconImg{
      margin: 20px 0 0 -35px;
    }
    h3{
      margin-left: 30px;
    }
  }
  .homeContent {
    margin-top: 40px;
  }
  .bar{
    margin: 20px;
  }
  .quota{
    margin: 20px;
    display: flex;
    justify-content: space-between;
    color: #aba9ad;
    font-size: 18px;
    font-weight: bold;

  }
  .mouth{
    display: flex;
    justify-content: space-around;
    margin: 40px 20px 0;
  }
  .loan{
    margin: 15px 20px;
  }
  .notice{
    // display: flex;
    margin-top: 20px;
    font-weight: bold;
  }
  .noticeL{
  }
  .noticeR {
    width: 100%;
    height: 20px;
    line-height: 20px;;
    margin-top: -30px;
    text-align: center;
    float: right;

  }
  .study{
    font-size: 13px;
    color: #aba9ad;
  }
  .yuan{
    color: #a2a0a3;
    font-size: 15px;
    margin-left: 10px;
  }
  .money{
    color: #5c43ff;
    font-weight: bolder;
    font-size: 24px;
    text-align: center;
    margin-top: 15px;
    line-height: 40px;
  }
  .button{
    background: linear-gradient(to left, #5d40ff 15%, #3996fd 85%);
    color: #fff;
    font-size: 16px;
    border-radius: 50px;
    margin-top: 30px;
  }
  .buttonm1{
    background: #fff;
    color: #644eff;
    border: 1px solid #644eff;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;
    height: 30px;
    line-height: 1;
  }
  .active{
    background: linear-gradient(to left, #5d40ff 15%, #3996fd 85%);
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
    border: 1px;
    height: 30px;
    line-height: 1;
  }
  .bImg{
    margin-top: 20px;
    width: 92%;
    margin-left: 0 auto;
    margin-bottom: 40px;
  }
}
.introduction{
  display: flex;
  justify-content: space-around;
  color: #302e31;
  font-size: 16px;
  font-weight: bolder;
  margin: 70px 0 20px;
}
</style>

<!--
// <style lang="less">
// .van-notice-bar__wrap{
//   overflow: visible;
// }
// .homeContainer{
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   .topSlot{
//       height: 50px;
//   }
//   .navTop{
//     display: flex;
//     justify-content: space-around;
//     .iconImg{
//       margin: 20px 0 0 -35px;
//     }
//     h3{
//       margin-left: 30px;
//     }
//   }
//   .homeContent {
//     margin-top: 40px;
//   }
//   .bar{
//     margin: 20px;
//   }
//   .quota{
//     margin: 20px;
//     display: flex;
//     justify-content: space-between;
//     color: #aba9ad;
//     font-size: 18px;
//     font-weight: bold;

//   }
//   .mouth{
//     display: flex;
//     justify-content: space-around;
//     margin: 40px 20px 0;
//   }
//   .loan{
//     margin: 15px 20px;
//   }
//   .notice{
//     // display: flex;
//     margin-top: 20px;
//     font-weight: bold;
//   }
//   .noticeL{

//   }
//   .noticeR{
//     .noticeR {
//     width: 100%;
//     height: 20px;
//     line-height: 20px;;
//     margin-top: -30px;
//     text-align: center;
//     float: right;
//   }
//   }
//   .study{
//     font-size: 13px;
//     color: #aba9ad;
//   }
//   .yuan{
//     color: #a2a0a3;
//     font-size: 15px;
//     margin-left: 10px;
//   }
//   .money{
//     color: #5c43ff;
//     font-weight: bolder;
//     font-size: 24px;
//     text-align: center;
//     margin-top: 15px;
//     line-height: 40px;
//   }
//   .button{
//     background: linear-gradient(to left, #5d40ff 15%, #3996fd 85%);
//     color: #fff;
//     font-size: 16px;
//     border-radius: 50px;
//     margin-top: 30px;
//   }
//   .buttonm1{
//     background: #fff;
//     color: #644eff;
//     border: 1px solid #644eff;
//     font-size: 16px;
//     font-weight: 600;
//     border-radius: 10px;
//     height: 30px;
//     line-height: 1;
//   }
//   .active{
//     background: linear-gradient(to left, #5d40ff 15%, #3996fd 85%);
//     color: #fff;
//     font-size: 16px;
//     border-radius: 10px;
//     border: 1px;
//     height: 30px;
//     line-height: 1;
//   }
//   .bImg{
//     margin-top: 20px;
//     width: 92%;
//     margin-left: 0 auto;
//     margin-bottom: 40px;
//   }
// }
// .introduction{
//   display: flex;
//   justify-content: space-around;
//   color: #302e31;
//   font-size: 16px;
//   font-weight: bolder;
//   margin: 70px 0 20px;
// }

// </style>
