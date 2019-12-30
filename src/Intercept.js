// import axios from 'axios';
// let _a = axios;
// let _b = axios.create({
// 	baseURL : 'http://47.111.97.50:8003',
// 	headers: { 
// 		'Content-Type': 'application/json;charset=UTF-8'},
// 	transformRequest: [
// 		function (data) {
// 			let ret = '';
// 			for (let it in data) {
// 				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
// 			}
// 			return ret;
// 		}
// 	]
// });
// export const AxiosInstance = params => { return params ? _a : _b };
// _a.interceptors.request.use(config => {
// 	// if (document.cookie.length) {
// 	// 	let auth_token = JSON.parse(document.cookie)['token'];
// 	// 	console.info(auth_token);
// 	// }
// 	let auth_token=sessionStorage.getItem('token');
// 	if (auth_token) config.headers['token'] = auth_token;
// 	return config;
// }, error => { return Promise.reject(error); });
// _b.interceptors.request.use(config => {
// 	// if (document.cookie.length) {
// 	// 	let auth_token = JSON.parse(document.cookie)['token'];
// 	// 	console.info(auth_token);
		
// 	// }
// 	let auth_token=sessionStorage.getItem('token');
// 	if (auth_token) config.headers['token'] = auth_token;
// 	return config;
// }, error => { return Promise.reject(error); });