module.exports = {
  outputDir: '../docs',
  assetsDir: './',
  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Working Timer",
        appId: "com.sample.workingtimer",
        mac: {
          icon: 'public/icon-512.png',
        },
      }
    }
  }
};
