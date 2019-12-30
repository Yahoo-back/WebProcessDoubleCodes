module.exports = {
  presets: ['@vue/app'],
  plugins: [
    ['import', {
      // $: "jquery",
      // jQuery: "jquery",
      // jquery: "jquery",
      // "window.jQuery": "jquery",
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
