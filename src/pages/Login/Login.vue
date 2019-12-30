<!-- 登录 -->
<template>
  <div class="loginContainer">
    <div class="topBanner">
      <img :src="topBanner" alt="" style="width: 100% ">
    </div>
    <div class="loginPage">
      <div class="userName">
        <van-cell-group>
          <van-field v-model="modelValue" placeholder="请输入手机号" />
        </van-cell-group>
      </div>
      <div class="yzCode">
        <van-field
            v-model="sms"
            center
            clearable
            placeholder="请输入验证码"
          >
          <van-button
            slot="button"
            size="small"
            :disabled="countdown > 0 || this.modelValue==''"
            type="primary"
            @click="getCode">
          {{ countdown ? countdown + '秒' : '获取验证码'}}
        </van-button>
        </van-field>
      </div>
      <van-button type="info" size="large" @click="application">立即申请</van-button>
      <div class="xieyi">
        <span @click="xyqh()" v-show="showIcon"><img :src="iconxy" alt=""/></span>
        <span @click="xyqh()" v-show="!showIcon"><img :src="iconxyB" alt=""/></span>
        <span class="xy">我已阅读并同意<router-link to="agreenment" class="agreenment">《用户服务协议》</router-link></span>
      </div>
    </div>
    <div class="bottomBanner">
      <img :src="bottomBanner" alt="" style="width: 100%">
      <div class="footer">
        <p></p>
        <div class="bah">粤ICP备19151608</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../../SystemService'
export default {
  name: 'Login',
  data() {
    return {
      topBanner: require('../../assets/image/mcBanner.png'),
      bottomBanner: require('../../assets/image/mjBottom.png'),
      iconxy: require('../../assets/image/mjdisagree.png'),
      iconxyB: require('../../assets/image/mjagree.png'),
      showIcon: false,
      sms: '',
      countdown: '',
      countdowns: '',
      modelValue: '',
      code: ''
    }
  },
  mounted() {
    // 截取路径后面的通道
    var channel = this.$route.fullPath
    this.channel = channel.slice(2)
    // console.log(this.channel)
    api.uvCount({
      cmd: "uvCount",
      token: '',
      version: '1.0',
      params: {channel: this.channel}
    }).then(res => {
      if(res.data.result == 1) {
        this.$toast(res.data.resultNote)
      }else{

      }

    })
  },
  methods:{
    xyqh() {
      this.showIcon = !this.showIcon;
    },
    application() {
        let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
        this.code = this.code
        // this.getCode()
        if(this.modelValue == '') {
          this.$toast('请输入手机号')
        }else if(!phoneReg.test(this.modelValue)) {
          this.$toast('请输入正确的手机号')
        } else if(this.sms != this.code) {
          this.$toast('请输入正确的验证码')
        } else if(this.sms == '') {
          this.$toast('请输入验证码')
        } else if(this.showIcon == true) {
          this.$toast('协议未同意')
        }else {
          // this.$router.replace('/home')
        
      api.register({
        cmd: "register",
        token: '',
        version: '1.0',
        params: {mobile: this.modelValue, validCode:this.sms, channel: this.channel}
      }).then(res => {
        if(res.data.result == 0) {
           this.uuid = res.data.detail.uuid;
           sessionStorage.setItem('uuid',this.uuid);
           this.$router.replace('/home')
        }else if(res.data.result == 1){
          if(res.data.detail.uuid){
            this.uuid = res.data.detail.uuid;
            sessionStorage.setItem('uuid',this.uuid);
            this.$router.replace('/home')
          }else{
            this.$toast(res.data.resultNote);
          }
        }
      })
        }
    },
    //验证码倒计时
    countdownSubtract() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.countdownSubtract()
        }, 1000)
      }
    },
    getCode(){
      this.countdown = 60;
      this.countdownSubtract();
      api.sendSms({
        cmd: "sendSms",
        token: '',
        version: '1.0',
        params: {mobile: this.modelValue, channel:this.channel, type: 'register'}
      }).then(res => {
            if(res.data.result == 0) {
              this.code = res.data.detail.vcode
            }else if(res.data.result == 1){
              // if(res.data.resultNote == "用户已注册，请下载APP登录！"){
                if(res.data.detail.uuid){
                  this.uuid = res.data.detail.uuid;
                  sessionStorage.setItem('uuid',this.uuid);
                  this.$router.replace('/home')
                }else{
                  setTimeout(() => {
                    this.$router.push('/downLoad')                 
                  }, 1000)
                  this.$toast(res.data.resultNote);
                }
                
                // this.$toast(res.data.resultNote);
              // }else{
              //   this.$toast(res.data.resultNote);
              // }
            }else{
                this.$toast(res.data.resultNote);
            }
          })
    },
  }
}
</script>

<style lang="less">
h4{
  text-align: center;
}
  .loginPage {
    margin: 40px 20px;
    .userName{
      margin-bottom: 10px;
      border: 1px solid #e5e5e5;
    }
    .yzCode{
      margin: 20px auto;
      border: 1px solid #e5e5e5;
    }
    .xieyi{
      margin: 20px auto;
      text-align: left;
      .icon{
        width: 18px;
        width: 18px;
        border: 1px solid #7D7E80;
      }
      span{
        // margin:-20px auto;
        img{
          width: 13px;
          height: 13px;
          margin: 5px 10px 0 0;
        }
      }

    }
  }
  .footer{
    width: 100%;
    height: 32px;
    background:  #458beb;
    margin:-30px auto;
  }
  .bah{
    text-align: center;
    color: #3a3737;
    font-size: 18px;
    padding-top: 15px; 
    padding-bottom: 20px;
    background-color: #458beb;
  }
  .agreenment{
    color: #458beb;
  }
</style>
