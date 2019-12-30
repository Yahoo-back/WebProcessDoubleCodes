const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/production-sub-path/'
  // : '/',
  css: {
    sourceMap: true,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            browsers: ['Android >= 4.0', 'iOS >= 7']
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            minPixelValue: 1
          })
        ]
      }
    }
  },
  devServer: {
    host: "localhost",
    port: 8009,     // 端口
    open: true,
    proxy:{
      '/api':{
        target: 'http://121.41.91.64:8009',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
      }
      }
    },
},
// withCredentials: false,
// lintOnSave: process.env.NODE_ENV !== 'production'
// lintOnSave: false   // 取消 eslint 验证
}
