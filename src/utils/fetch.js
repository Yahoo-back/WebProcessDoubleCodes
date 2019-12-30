import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 60000,                  // 请求超时时间
  withCredentials: false,
  	headers: { 
		'Content-Type': 'application/json;charset=UTF-8'},
  proxy:{
    host: 'localhost',
    port: 8009,
    '/api':{
      target: 'http://121.41.91.64:8009',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api':''
      }
    }
  }
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// request拦截器
axios.interceptors.request.use(function(config){
  return config;
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response){
  //对响应数据做些事
   return response;
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});

export default service;
