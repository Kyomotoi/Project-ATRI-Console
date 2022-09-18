const { defineConfig } = require('@vue/cli-service')
const fileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      let plugins = []
      plugins.push(
        new fileManagerPlugin({
          events: {
            onEnd: {
              mkdir: ['./archive'],
              archive: [
                {source: './dist', destination: './archive/dist.zip'}
              ]
            }
          }
        })
      )
      config.plugins = config.plugins.concat(plugins)
    }
  }
})
