const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath這參數加入是因為VUE架到IIS上會友虛擬路徑的問題(因為有用到Router所以index.js裡也要設定base等於這路徑)
  publicPath: './',
  //導出的網頁靜態檔路徑
  outputDir: '../wwwroot',
})
