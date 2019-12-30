<!-- 验证 -->
<template>
  <div class="verContainer">
    <div class="spaceBar"></div>
    <div class="verImage">
      <img :src="topLogo" width="100%" height="200px" alt="">
    </div>
    <div class="verInfo">
      <van-popup v-model="showDo" position="bottom" :style="{ height: '25%', width: '100%', textAlign: 'center' }">
        <p v-for="(item,index) in consumption" :key="index" :style="{color:'black'}" @click="getContact(item)">{{item}}</p>
      </van-popup>
      <van-popup v-model="showTime" position="bottom" :style="{ height: '20%', width: '100%', textAlign: 'center' }">
        <p v-for="(items,index) in consumptionTime" :key="index" :style="{color:'black'}" @click="getContactTime(items)">{{items}}</p>
      </van-popup>
      <van-cell title="申请期限" is-link :value="verificationTime" @click="getTime()"/>
      <van-cell title="借款用途" is-link :value="verificationName" @click="getCon()" />
      <van-cell title="收款银行" is-link v-model="bank" />
      <van-cell title="预估利息" is-link value="0.01%" />
    </div>
    <div class="bottomButton">
      <van-button v-if="type" class="button" size="large" round @click="determine()">立即拿钱</van-button>
      <van-button v-if="moneyType" class="button" size="large" round @click="getMoney()">立即拿钱</van-button>
      <van-dialog
        v-model="show"
        title="正在验证您的银行卡"
        show-cancel-button
        confirm="yz()"
        :beforeClose="beforeClose"
      >
      <p class="info">已向您的手机 {{this.call}} 发送验证码</p>
      <van-cell-group>
        <van-field clearable v-model="yzCode" placeholder="请输入验证码">
          <van-button
            slot="button"
            size="small"
            :disabled="countdown > 0"
            @click="again()"
            type="primary">
          {{ countdown ? countdown + '秒' : '重新发送'}}
        </van-button>

          <!-- <van-button slot="button" size="small" type="primary" color="#E5E5E5">发送验证码</van-button> -->
        </van-field>
      </van-cell-group>
      </van-dialog>
      <div class="bottom"><van-checkbox v-model="checked" class="left"></van-checkbox><div class="right">我已阅读并同意购买 {{this.money}}元VIP <router-link to="vipAgreenment" class="agreenment">《多点分期VIP专享服务协议》</router-link></div></div>
    </div>
  </div>
</template>

<script>
import * as api from '../../SystemService'
import {Toast,Dialog,Checkbox} from 'vant';
export default {
  name: 'Verification',
  data() {
    return {
      type: true,
      moneyType: false,
      bank: '',
      value: '',
      countdown: '',
      time: 30*1000,
      checked: true,
      show: false,
      call: '',
      showDo: false,
      money: '249',
      yzCode: '',
      showTime: false,
      consumption: ['生活用途','投资用途','其他用途'],
      consumptionTime: ['1个月','6个月','12个月'],
      verificationName: '生活用途',
      verificationTime: '1个月',
      topLogo: require('../../assets/image/topLogo.png'),
      uuid: '',
      bnkNo: '',
      ip: '',
      cashComit: '',
      type: 1,
      smsCode: ''
    }
  },
  mounted() {
    var type = sessionStorage.getItem('type')
    var uuid = sessionStorage.getItem('uuid')
    var bankNo = sessionStorage.getItem('bankNo')
    var bankName = sessionStorage.getItem('bank')
    var bankPhone =  sessionStorage.getItem('bankPhone')
    // 手机号后四位
    var phone2 = bankPhone.substr(bankPhone.length-4)
    // 手机号前四位
    var phone1 = bankPhone.substr(0,4)
    var call = phone1+'****'+phone2;
    this.call = call;
    var no = bankNo.substr(bankNo.length-4)
    var s = bankName+no;
    this.bank = s;
    this.uuid= uuid;
  },
  created(){
    var uuid = sessionStorage.getItem('uuid')
    this.uuid = uuid;
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
              // this.active = 0
              this.$router.push('/review')
            }else if(userAuthStatus == 1){
              // this.active = 1
              this.$router.push('/review')
            }else if(userAuthStatus == 2){
              // this.active = 2
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
  methods:{
    //两笔验证码type=9，249变为179
    getMoney(){
       var type = sessionStorage.getItem('type')
      //无验证码2笔支付
        if(type == 9){
          api.cashComit({
          cmd: "cashComit",
          token: '',
          version: '1.0',
          params: {uuid: this.uuid,type:1,moneyType: 0,smsCode: '123456'}
          })
          .then(res => {
            if(res.data.detail.code == 0) {
              Dialog.alert({
                title: '温馨提示',
                message: '购买成功'
              }).then(() => {
                //跳转下载链接
                this.$router.push('/downLoad')
              });
            }
            else if(res.data.detail.code == 1)
            {
              Dialog.alert({
                    title: '温馨提示',
                    message: '购买失败'
                  }).then(() => {
                    this.$router.push('/downLoad')
                  });
            }else{
              this.$router.push('/downLoad')
            }
          })
        }
    },
     //两笔验证码type=9，249
    determine() {
      var type = sessionStorage.getItem('type')
      var uuid = sessionStorage.getItem('uuid')
      var bankNo = sessionStorage.getItem('bankNo')
      var bankName = sessionStorage.getItem('bank')
      var bankPhone =  sessionStorage.getItem('bankPhone')
      this.uuid= uuid;
      if(this.checked == true){
        //无验证码一笔支付
        if(type == 1 || type == 2 || type == 3 || type == 4){
          api.cashComit({
          cmd: "cashComit",
          token: '',
          version: '1.0',
          params: {uuid: this.uuid,type:1,smsCode: '123456'}
          })
          .then(res => {
            if(res.data.detail.code == 0) {
              Dialog.alert({
                title: '温馨提示',
                message: '购买成功'
              }).then(() => {
                //跳转下载链接
                this.$router.push('/downLoad')
              });
            }else if(res.data.detail.code == 1)
            {
              this.$router.push('/downLoad')
            }else{
            }
          })
        }
        //有验证码
        if(type == 5 || type == 8 || type == 7){
            this.show = true;
            this.countdown = 30;
            this.countdownSubtract();
            api.dySendPayMsg({
            cmd: "dySendPayMsg",
            token: '',
            version: '1.0',
            params: {uuid: this.uuid,bankNo:bankNo,ip: '123456'}
            })
            .then(res => {
              if(res.data.detail.code == 0) {
              }else if(res.data.detail.code == 1)
              {
                this.$toast(res.data.resultNote);
              }else{
                this.$toast(res.data.resultNote);
              }
            })
        }
        //无验证码2笔支付
        if(type == 9){
          api.cashComit({
          cmd: "cashComit",
          token: '',
          version: '1.0',
          params: {uuid: this.uuid,type:1,moneyType: 1,smsCode: '123456'}
          })
          .then(res => {
            if(res.data.detail.code == 0) {
              Dialog.alert({
                title: '温馨提示',
                message: '购买成功'
              }).then(() => {
                //跳转下载链接
                this.$router.push('/downLoad')
              });
            }
            else if(res.data.detail.code == 1)
            {
               Dialog.alert({
                    title: '温馨提示',
                    message: '购买失败'
                  }).then(() => {
                    this.money = "179",
                    this.type = false;
                    this.moneyType = true;
                  });
            }else{
            }
          })
        }
      }else{
        Toast('请阅读并同意服务协议');
        this.show = false;
      }
    },

    getCon() {
      this.showDo = true;
    },
    getTime() {
      this.showTime = true;
    },
    getContact(va) {
      this.verificationName = va;
      this.showDo = false
    },
    getContactTime(val) {
      this.verificationTime = val;
      this.showTime = false
    },
    countdownSubtract() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.countdownSubtract()
        }, 1000)
      } else{
        this.countdown == 0;
      }
    },

    again() {
      var type = sessionStorage.getItem('type')
      var uuid = sessionStorage.getItem('uuid')
      var bankNo = sessionStorage.getItem('bankNo')
      var bankName = sessionStorage.getItem('bank')
      var bankPhone =  sessionStorage.getItem('bankPhone')
      this.uuid= uuid;
      this.countdown = 30;
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.countdownSubtract()
        }, 1000)
           api.dySendPayMsg({
            cmd: "dySendPayMsg",
            token: '',
            version: '1.0',
            params: {uuid: this.uuid,bankNo:bankNo,ip: '123456'}
            })
            .then(res => {
              if(res.data.detail.code == 0) {
              }else if(res.data.detail.code == 1)
              {
                this.$toast(res.data.resultNote);
              }else{
                this.$toast(res.data.resultNote);
              }
            })
      } else{
        this.countdown == 0;
      }
    },
    //验证码弹框确定按钮扣款
    beforeClose(action, done) {
      if(action === 'confirm') {
        // 调用 cashComit 接口，传入 uuid type:1 smsCode验证码
         api.cashComit({
          cmd: "cashComit",
          token: '',
          version: '1.0',
          params: {uuid: this.uuid,type:1,smsCode: this.yzCode}
          })
          .then(res => {
            if(res.data.detail.code == 0) {
              setTimeout(done, 1000)
              Dialog.alert({
                title: '温馨提示',
                message: '购买成功'
              }).then(() => {
                //跳转下载通道界面，（注册页的download页面）
                this.$router.push('/downLoad')
              });
            }else if(res.data.detail.code == 1)
            {
              this.$router.push('/downLoad')
              this.$toast(res.data.resultNote);
            }else{
              this.$toast(res.data.resultNote);
            }
          })
      } else if(action === 'cancel') {
         done()
      }
    },
  },
}
</script>

<style lang="less">
.van-button--primary{
  background: #fff;
  color: #0d0e0e;
  font-size: 14px;
}
.van-field__control{
  padding-left: 15px;
}
.van-dialog__header{
  color: #4c4b4c;
  // font-weight: bold;
  font-size: 17px;
}
.van-cell{
  color: #3e3b3b;
}
.verContainer{
  // margin: 20px;
  .spaceBar{
    height: 40px;
  }
  .verImage{
    // height: 160px;
    // background: #0000CC;
    margin: 0 auto;
  }
  .verInfo{
    text-align: left;
    margin: 40px auto;
    // font-weight: bold;
  }
  .bottomButton{
    width: 94%;
    margin-left: 3%;
    margin-top: 60px;
    p{
      font-size: 13px;
    }
  }
  .button{
    background: linear-gradient(to left, #5d40ff 15%, #3996fd 85%);
    color: #fff;
    font-size: 16px;
    border-radius: 50px;
    margin-top: 20px;
    letter-spacing: 1px;
  }
  .info{
    text-align: left;
    margin-left: 15px;
    color: #878788;
    letter-spacing: 1px;
  }
  .bottom{
    display: flex;
    margin-top: 10px;
    position: relative;
  }
  .right{
    margin-top: 3px;
    margin-left: 2px;
    font-size: 11px;
    height: 1em;
    line-height: 1em;
  }
  .agreenment{
    color: #1989fa;
  }
  p{
    text-align: center
  }
}
  .van-button--default{
    color:#5d5d5f;
  }
  .van-checkbox{
    overflow: visible;
  }
  .van-field__control{
    color: #878788;
  }
  .van-dialog__confirm, .van-dialog__confirm:active{
    color: #000;
  }
</style>
