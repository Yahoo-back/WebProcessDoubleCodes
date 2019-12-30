<template>
  <div class="reviewContainer">
    <div class="spaceTop"></div>
    <div class="navTop">
      <div class="iconImg">
        <van-icon name="arrow-left" size="18px" @click="goBack()" />
      </div>
      <h3>{{info}}</h3>
      <span></span>
    </div>
    <div class="schedule">
      <van-steps
        :active="active"
        active-icon="success"
        active-color="#38f"
      >
        <van-step>身份信息</van-step>
        <van-step>紧急联系人</van-step>
        <van-step>银行卡</van-step>
        <!-- <van-step>完成提现</van-step> -->
      </van-steps>
    </div>
    <van-tabs v-model="active" background="width" title-active-color="white" title-inactive-color="white" color="white" :border="false">
      <!-- 个人信息 -->
      <van-tab title="">
        <div class="reviewInfo">
          <van-cell-group>
            <van-field
              v-model="username"
              clearable
              label="姓名"
              placeholder="请输入姓名"
            />
            <van-field
              v-model="idreg"
              clearable
              label="身份证号"
              placeholder="请输入身份证号"
            />
          </van-cell-group>
        </div>
      </van-tab>

      <!-- 紧急联系人 -->
      <van-tab title="">
        <div class="reviewInfo">
          <van-popup v-model="showSon" position="bottom" :style="{ height: '25%', width: '100%', textAlign: 'center' }">
            <p v-for="(item,index) in contactOne" :key="index" :style="{color:'black'}" @click="getContact(item)">{{item}}</p>
          </van-popup>
          <van-cell title="直系联系人" is-link :value="contactName" @click="contact()" />
          <van-cell-group>
            <van-field
              v-model="telSon"
              clearable
              label="手机号"
              type="number"
              placeholder="请输入手机号"
            />
          </van-cell-group>
          <div class="barLine"></div>
          <van-popup v-model="showFri" position="bottom" :style="{ height: '25%', width: '100%', textAlign: 'center' }">
            <p v-for="(item,index) in contactTwo" :key="index" :style="{color:'black'}" @click="getContacts(item)">{{item}}</p>
          </van-popup>
          <van-cell title="其他联系人" is-link :value="contactNames" @click="contacts()" />
          <van-cell-group>
            <van-field
              v-model="telOrder"
              type="number"
              clearable
              label="手机号"
              placeholder="请输入手机号"
            />
          </van-cell-group>
        </div>
      </van-tab>
      <!-- 银行卡 -->
      <van-tab title="">
        <div class="reviewInfo">
          <van-cell-group>
            <van-field
              v-model="username"
              clearable
              label="户名"
              placeholder="请输入姓名"
            />
            <van-field
              v-model="idreg"
              clearable
              label="身份证号"
              placeholder="请输入身份证号"
            />
            <van-field
              readonly
              clickable
              label="选择银行"
              :value="bankValue"
              placeholder="请选择银行"
              @click="choseBank"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="bankList"
                @cancel="showPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
            <van-field
              v-model="bankreg"
              clearable
              label="银行卡号"
              placeholder="请输入银行卡号"
            />
            <van-field
              v-model="telreg"
              type="number"
              clearable
              label="预留手机号"
              placeholder="请输入预留手机号"
            />
            <div class="barLine"></div>
            <van-field
                v-model="sms"
                center
                clearable
                label="验证码"
                placeholder="请输入验证码"
              >
              <van-button
                slot="button"
                size="small"
                :disabled="countdown > 0"
                type="primary"
                @click="getCode">
              {{ countdown ? countdown + '秒' : '获取验证码'}}
            </van-button>
                <!-- <van-button slot="button" size="small" type="primary" color="#E5E5E5" @click="getCode">获取验1证码</van-button> -->
              </van-field>
          </van-cell-group>
        </div>
      </van-tab>
      <!-- 验证 -->
      <!-- <van-tab title="">
        <div class="reviewinfo">
          <p>需认证号码真实性</p>
          <p>各环节多重加密，防范泄露风险</p>
          <van-field
              v-model="smsCode"
              center
              clearable
              label="验证码"
              placeholder="请输入验证码"
            >
            <van-button
                slot="button"
                size="small"
                :disabled="countdowns > 0"
                type="primary"
                @click="getCodes">
              {{ countdowns ? countdowns + '秒' : '获取验证码'}}
            </van-button>
            </van-field>
        </div>
      </van-tab> -->
    </van-tabs>
    <div class="nextOne" @click="nextStep()">
      <van-loading type="spinner" v-if="load" />
      <van-button type="info" size="large" :disabled="isDisable">下一步</van-button>
    </div>
  </div>
</template>

<script>
import * as api from '../../SystemService'
export default {
  data() {
    return {
      countdown: '',
      countdowns: '',
      active: 0,
      info: '个人信息',
      show: false,
      idreg: '',
      username: '',
      telreg: '',
      telSon: '',
      telOrder: '',
      bankreg: '',
      sms: '', /* 验证码*/
      uuid: '',
      userAuthStatusr: '',
      smsCode: '',
      showSon: false,
      showFri: false,
      isDisable: false,
      load: false,
      contactName: '请选择联系人',
      contactNames: '请选择联系人',
      contactOne: ['儿子','父亲','母亲','女儿'],
      contactTwo: ['同事','亲戚','同学','朋友'],
      bankValue: '',
      showPicker: false,
      bankList: [],
      columns: ['中国银行', '建设银行', '工商银行', '农业银行', '招商银行']
    };
  },
  mounted(){
    //从首页userAuthStatus获取的值
    var a = sessionStorage.getItem('userAuthStatus')
    //从紧急联系人获取
    var b = this.userAuthStatusr;
    var name = sessionStorage.getItem('name')
    var type = sessionStorage.getItem('type')
    var idCard = sessionStorage.getItem('idCard')
    var uuid = sessionStorage.getItem('uuid')
    this.uuid = uuid;

    this.username = name == 0 ? '' : name;
    this.idreg = idCard == 0 ? '' : idCard;
    // console.log("a"+a)
    // console.log("b"+b)
    //根据userAuthStatus的值进行页面跳转
    // if(b){
    //   if(b == 0){
    //   this.active = 0
    //   }else if(b == 1){
    //     this.active = 1;
    //   }else if(b == 2){
    //     this.active = 2;
    //     this.username = name;
    //     this.idreg = idCard;
    //   }else if(b == 3){
    //     this.active = 3;
    //   }else{
    //   }
    // }else{
      if(a == 0){
        this.active = 0
      }else if(a == 1){
        this.active = 1;
      }else if(a == 2){
        this.active = 2;
        this.username = name;
        this.idreg = idCard;
      }else if(a == 3){
        // this.active = 3;
        this.$router.push('/verification')
      }else if(a == 4){
        this.$router.push('/downLoad')
      }
    // }
      var type = sessionStorage.getItem('type')
      var type1 = sessionStorage.getItem('type1')
      var type2 = sessionStorage.getItem('type2')
      // console.log(type+'type')
      // console.log(type1+'type1')
      // console.log(type2+'type2')
      if(type){
        var types = type
      }else if(type1){
        var types = type1
      }else if(type2){
        var types = type2
      }
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
              this.active = 0
            }else if(userAuthStatus == 1){
              this.active = 1
            }else if(userAuthStatus == 2){
              this.active = 2
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
      var type = sessionStorage.getItem('type')
      var type1 = sessionStorage.getItem('type1')
      var type2 = sessionStorage.getItem('type2')
      let idCardReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      let pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
      if(type){
        var types = type
      }else if(type1){
        var types = type1
      }else if(type2){
        var types = type2
      }
      // console.log(types)
        if(this.bankValue == '') {
          this.$toast('请选择银行！');
        }else if(this.bankreg == '') {
          this.$toast('请输入银行卡号！');
        }else if(!pattern.test(this.bankreg)) {
          this.$toast('银行卡号格式错误，请重新输入！');
        }else if(this.telreg == '') {
          this.$toast('请输入手机号！');
        }else if(!phoneReg.test(this.telreg)) {
          this.$toast('手机号码格式错误，请重新输入！');
        }else {
          this.countdown = 30;
          this.countdownSubtract();
            // 区分type
          //验证码type为1
            if(types == 1){
              api.kqBindCardReq({
                cmd: "kqBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            //验证码type为2
            if(types == 2){
              api.cjBindCardReq({
                cmd: "cjBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            //验证码type为3
            if(types == 3){
              api.xfBindCardReq({
                cmd: "xfBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            //验证码type为4
            if(types == 4){
              api.zlBindCardReq({
                cmd: "zlBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            //验证码type为5
            if(types == 5){
              api.ybBindCardReq({
                cmd: "ybBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            //验证码type为7
            if(types == 7){
              api.dyBindCardReq({
                cmd: "dyBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            //验证码type为8
            if(types == 8){
              api.ldBindCardReq({
                cmd: "ldBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            //验证码type为9
            if(types == 9){
              api.ylBindCardReq({
                cmd: "ylBindCardReq",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bankName:this.bankValue,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
        }

    },
    choseBank(){
       api.cardList({
          cmd: "cardList",
          token: '',
          version: '1.0',
          params: {uuid: this.uuid}})
          .then(res => {
            if(res.data.result == 0) {
              var bankLists = res.data.detail.bankCardList;
              var banks = [];
              for(var i = 0;i < bankLists.length;i++){
                banks.push(bankLists[i].name)
              }
              this.bankList = banks
            }else if(res.data.result == 1)
            {
              this.$toast(res.data.resultNote);
            }else{
              this.$toast(res.data.resultNote);
            }
          })
      this.showPicker = true;
    },
    nextStep() {
      // 第一步判断
      this.isDisable=true
      this.load = true
        setTimeout(()=>{
      	   this.isDisable=false   //点击一次时隔两秒后才能再次点击
      	   this.load = false
         },2000)
      let idCardReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
      let phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
      let pattern = /^([1-9]{1})(\d{14}|\d{18})$/;
      if(this.active == 0) {
        if(!idCardReg.test(this.idreg)) {
          this.$toast('身份证格式错误，请重新输入!');
        } else if(this.username == ''){
          this.$toast('请填写姓名')
        } else {
          api.uploadIDCardPicture({
          cmd: "uploadIDCardPicture",
          token: '',
          version: '1.0',
          params: {uuid: this.uuid,customeName:this.username,idCard:this.idreg}})
          .then(res => {
            if(res.data.result == 0) {
              this.active ++;
              toast.clear();
            }else if(res.data.result == 1)
            {
              this.$toast(res.data.resultNote);
            }else{
              this.$toast(res.data.resultNote);
            }
          })
          api.userAuthStatus({
            cmd: "userAuthStatus",
            token: '',
            version: '1.0',
            params: {uuid: this.uuid}})
            .then(res => {
              if(res.data.result == 0) {
                var userAuthStatus = res.data.detail.userAuthStatus;
                var name = res.data.detail.name;
                var type1 = res.data.detail.type;
                var idCard = res.data.detail.idCard;
                sessionStorage.setItem('userAuthStatus',userAuthStatus)
                sessionStorage.setItem('name',name)
                //身份信息
                sessionStorage.setItem('type1',type1)
                sessionStorage.setItem('idCard',idCard)
                if(userAuthStatus == 0){
                  this.active = 0;
                  // this.$router.push('/review')
                }else if(userAuthStatus == 1){
                  this.active = 1;
                  // this.$router.push('/review')
                }else if(userAuthStatus == 2){
                  this.active = 2;
                  // this.$router.push('/review')
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
          
          toast.clear();
        };
      }else{
        this.active = this.active;
      }

      // 第二步判断
      if(this.active == 1) {
        if(!phoneReg.test(this.telSon)) {
          this.$toast('手机号码格式错误，请重新输入！');
        }else if(this.contactName == '请选择联系人'){
          this.$toast('请选择直系联系人');
        } else if(!phoneReg.test(this.telOrder)) {
          this.$toast('手机号码格式错误，请重新输入！');
        }else if(this.contactNames == '请选择联系人'){
          this.$toast('请选择其他联系人');
        } else {
          api.ContactOperato({
          cmd: "ContactOperato",
          token: '',
          version: '1.0',
          params: {uuid: this.uuid}})
          .then(res => {
            if(res.data.result == 0) {
              this.active ++;
              toast.clear();
            }else if(res.data.result == 1)
            {
              this.$toast(res.data.resultNote);
            }else{
              this.$toast(res.data.resultNote);
            }
          })
          api.userAuthStatus({
            cmd: "userAuthStatus",
            token: '',
            version: '1.0',
            params: {uuid: this.uuid}})
            .then(res => {
              if(res.data.result == 0) {
                var userAuthStatusr = res.data.detail.userAuthStatus;
                var name = res.data.detail.name;
                var type2 = res.data.detail.type;
                var idCard = res.data.detail.idCard;
                //点击紧急联系人调userAuthStatus接口
                this.userAuthStatusr = userAuthStatusr;
                sessionStorage.setItem('userAuthStatusr',userAuthStatusr)
                sessionStorage.setItem('name',name)
                //紧急联系人
                sessionStorage.setItem('type2',type2)
                sessionStorage.setItem('idCard',idCard)
                if(userAuthStatusr == 0){
                  this.active = 0;
                  // this.$router.push('/review')
                }else if(userAuthStatusr == 1){
                  this.active = 1;
                  // this.$router.push('/review')
                }else if(userAuthStatusr == 2){
                  this.active = 2;
                  // this.$router.push('/review')
                }else if(userAuthStatusr == 3){
                  //支付
                  this.$router.push('/verification')
                }else if(userAuthStatusr == 4){
                  this.$router.push('/downLoad')
                }else{
                  this.$toast(res.data.resultNote);
                }
              }else{
                  this.$toast(res.data.resultNote);
              }
            })
          toast.clear();
        }
      } else {
        this.active = this.active;
      };


      // 第三步判断
      if(this.active == 2) {
        // console.log(type)
        // var type = sessionStorage.getItem('type');
        // console.log(type)
        var type = sessionStorage.getItem('type')
        var type1 = sessionStorage.getItem('type1')
        var type2 = sessionStorage.getItem('type2')
        if(type){
          var types = type
        }else if(type1){
          var types = type1
        }else if(type2){
          var types = type2
        }
        // console.log(types)
        if(!idCardReg.test(this.idreg)) {
          this.$toast('身份证格式错误，请重新输入！');
        } else if(!phoneReg.test(this.telreg)) {
          this.$toast('手机号码格式错误，请重新输入！');
        } else if(this.bankValue == '') {
          this.$toast('请选择银行');
        } else if(!pattern.test(this.bankreg)) {
          this.$toast('银行卡号格式错误，请重新输入！');
        } else if(this.sms == '') {
          this.$toast('手机验证码错误!');
        } else {
            sessionStorage.setItem('uuid',this.uuid)
            sessionStorage.setItem('bankNo',this.bankreg)
            sessionStorage.setItem('bank',this.bankValue)
            sessionStorage.setItem('bankPhone',this.telreg)
            //区分type
            if(types == 1){
              api.kqBindCardConfirm({
                cmd: "kqBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            if(types == 2){
              api.cjBindCardConfirm({
                cmd: "cjBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            if(types == 3){
              api.xfBindCardConfirm({
                cmd: "xfBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            if(types == 4){
              api.zlBindCardConfirm({
                cmd: "zlBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            if(types == 5){
              api.ybBindCardConfirm({
                cmd: "ybBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            if(types == 7){
              api.dyBindCardConfirm({
                cmd: "dyBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    //跳转到跳一跳页面
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            if(types == 8){
              api.ldBindCardConfirm({
                cmd: "ldBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
            if(types == 9){
              api.ylBindCardConfirm({
                cmd: "ylBindCardConfirm",
                token: '',
                version: '1.0',
                params: {uuid: this.uuid,bankNo:this.bankreg,bank:this.bankValue,validateCode: this.sms,bankPhone:this.telreg}
                })
                .then(res => {
                  if(res.data.result == 0) {
                    // this.active ++;
                    this.$router.push('/slideImg')
                    toast.clear();
                  }else if(res.data.result == 1)
                  {
                    this.$toast(res.data.resultNote);
                  }else{
                    this.$toast(res.data.resultNote);
                  }
                })
            }
          // this.active ++;
          // toast.clear();
        };
      }else {
        this.active = this.active;
      }

      // 第四步判断
      if(this.active == 3) {
        if(this.smsCode == '') {
          this.$toast("请输入手机验证码");
        }
      }else {
        this.active = this.active;
      }


      if(this.active == 1) {
        this.info = '紧急联系人'
      } else if(this.active == 2) {
        this.info = '绑定银行卡'
      } else if(this.active == 3) {
        this.info = '手机运营商'
      } else {
        this.active = this.active;
      }
      // this.$router.replace('/verification')
    },
    selectBank() {
      this.show = true;
    },
    goBack() {
      this.$router.push('/home')
    },
    contact() {
      this.showSon = true;
    },
    contacts() {
      this.showFri = true;
    },
    getContact(value) {
      this.contactName = value;
      this.showSon = false;
    },
    getContacts(value) {
      this.contactNames = value;
      this.showFri = false;
    },
    onConfirm(bankValue) {
      this.bankValue = bankValue;
      this.showPicker = false;
    }
  }
}
</script>

<style lang="less">
  .van-button--primary{
    border: none;
  }
  .van-button--primary{
    color: #000;
  }
  .van-hairline--top-bottom::after{
    height: 0px;
  }
  .van-cell:not(:last-child)::after{
    border-bottom: 0px;
  }
  [class*=van-hairline]::after{
    border: 0px;
  }
  .reviewContainer{
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
    .spaceTop{
      height: 50px;
    }
    .schedule{
      text-align: left;
      margin: 20px;
    }
    .reviewInfo{
      margin: auto 20px;
      background: #E5E5E5;
      text-align: left;
      p{
        color: #E5E5E5;
      }
    }
    .nextOne{
      margin: 40px 20px;
    }
    .barLine{
      width: 100%;
      height: 8px;
      background: #E5E5E5;
    }
    p{
      text-align: center;
    }
  }
</style>
