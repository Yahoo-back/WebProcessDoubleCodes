import fetch from '@/utils/fetch'

// let base='http://localhost:8009';
let base='http://localhost:8000'
// 登录注册页验证码接口
export function uvCount(params) {
    return fetch({
      url: `${base}/uvCount`,
      method: 'post',
      body:{
        cmd: 'uvCount',
        token: '',
        version: '1.0',
      },
      data: params
    })
  }

//首頁
export function userAuthStatus(params) {
    return fetch({
        url: `${base}/userAuthStatus`,
        method: 'post',
        body:{
            cmd: "userAuthStatus",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//用户信息
export function uploadIDCardPicture(params) {
    return fetch({
        url: `${base}/uploadIDCardPicture`,
        method: 'post',
        body:{
            cmd: "uploadIDCardPicture",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//紧急联系人
export function ContactOperato(params) {
    return fetch({
        url: `${base}/ContactOperato`,
        method: 'post',
        body:{
            cmd: "ContactOperato",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//银行卡
//紧急联系人
export function cardList(params) {
    return fetch({
        url: `${base}/cardList`,
        // url: `/cardList`,
        method: 'post',
        body:{
            cmd: "cardList",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//获取验证码不要type：绑卡
export function bindCardReqByBankName(params) {
    return fetch({
        url: `${base}/bindCardReqByBankName`,
        method: 'post',
        body:{
            cmd: "bindCardReqByBankName",
            token: '',
            version: '1.0',
        },
        data: params
    })
}
//银行卡下一步不要type：绑卡
export function bindCardConfirmByBankName(params) {
    return fetch({
        url: `${base}/bindCardConfirmByBankName`,
        method: 'post',
        body:{
            cmd: "bindCardConfirmByBankName",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//获取验证码type1
export function kqBindCardReq(params) {
    return fetch({
        url: `${base}/kqBindCardReq`,
        method: 'post',
        body:{
            cmd: "kqBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//获取验证码type2
export function cjBindCardReq(params) {
    return fetch({
        url: `${base}/cjBindCardReq`,
        method: 'post',
        body:{
            cmd: "cjBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//获取验证码type3
export function xfBindCardReq(params) {
    return fetch({
        url: `${base}/xfBindCardReq`,
        method: 'post',
        body:{
            cmd: "xfBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//获取验证码type4
export function zlBindCardReq(params) {
    return fetch({
        url: `${base}/zlBindCardReq`,
        method: 'post',
        body:{
            cmd: "zlBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//获取验证码type5
export function ybBindCardReq(params) {
    return fetch({
        url: `${base}/ybBindCardReq`,
        method: 'post',
        body:{
            cmd: "ybBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}



//获取验证码type7
export function dyBindCardReq(params) {
    return fetch({
        url: `${base}/dyBindCardReq`,
        // url: `/dyBindCardReq`,
        method: 'post',
        body:{
            cmd: "dyBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//获取验证码type8
export function ldBindCardReq(params) {
    return fetch({
        url: `${base}/ldBindCardReq`,
        method: 'post',
        body:{
            cmd: "ldBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}
//获取验证码type9
export function ylBindCardReq(params) {
    return fetch({
        url: `${base}/ylBindCardReq`,
        method: 'post',
        body:{
            cmd: "ylBindCardReq",
            token: '',
            version: '1.0',
        },
        data: params
    })
}


//银行卡下一步
//type1
export function kqBindCardConfirm(params) {
    return fetch({
        url: `${base}/kqBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "kqBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//type2
export function cjBindCardConfirm(params) {
    return fetch({
        url: `${base}/cjBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "cjBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//type3
export function xfBindCardConfirm(params) {
    return fetch({
        url: `${base}/xfBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "xfBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//type4
export function zlBindCardConfirm(params) {
    return fetch({
        url: `${base}/zlBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "zlBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//type5
export function ybBindCardConfirm(params) {
    return fetch({
        url: `${base}/ybBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "ybBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}



//type7
export function dyBindCardConfirm(params) {
    return fetch({
        url: `${base}/dyBindCardConfirm`,
        // url: `/dyBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "dyBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//type8
export function ldBindCardConfirm(params) {
    return fetch({
        url: `${base}/ldBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "ldBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

// type9
export function ylBindCardConfirm(params) {
    return fetch({
        url: `${base}/ylBindCardConfirm`,
        // url: `/ylBindCardConfirm`,
        method: 'post',
        body:{
            cmd: "ylBindCardConfirm",
            token: '',
            version: '1.0',
        },
        data: params
    })
}

//点击立即拿钱出现弹框获取验证码整合接口
export function ylPaySendCode(params) {
    return fetch({
        url: `${base}/ylPaySendCode`,
        method: 'post',
        body:{
            cmd: "ylPaySendCode",
            token: '',
            version: '1.0',
        },
        data: params
    })
}
//点击立即拿钱出现弹框获取验证码
export function dySendPayMsg(params) {
    return fetch({
        url: `${base}/dySendPayMsg`,
        method: 'post',
        body:{
            cmd: "dySendPayMsg",
            token: '',
            version: '1.0',
        },
        data: params
    })
}



//不要验证码点击立刻拿钱/要验证码验证码输入验证码后点击确定
export function cashComit(params) {
    return fetch({
        url: `${base}/cashComit`,
        method: 'post',
        body:{
            cmd: "cashComit",
            token: '',
            version: '1.0',
            // type: '1',
            // smsCode: '验证码',
        },
        data: params
    })
}


// 绑定确认,立即拿钱


//pay接口不用
// 支付接口
// export function ylBindCardPay(params) {
//     return fetch({
//         url: `${base1}/ylBindCardPay`,
//         method: 'post',
//         body:{
//             cmd: "ylBindCardPay",
//         },
//         data: params
//     })
// }

// 登录注册页接口
export function register(params) {
  return fetch({
    url: `${base}/register`,
    method: 'post',
    body:{
      cmd: 'register',
      token: '',
      version: '1.0',
    },
    data: params
  })
}


// export const uvCount = params => { return _instance.post(`/uvCount`, {"params":params}).then(res => res.data); };



export function sendSms(params) {
  return fetch({
    url: `${base}/sendSms`,
    method: 'post',
    body:{
      cmd: 'sendSms',
      token: '',
      version: '1.0',
    },
    data: params
  })
}
