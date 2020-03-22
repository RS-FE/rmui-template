'use strict'
const path = require('path')
const defaultSettings = require('./src/config/index.js')
const name = defaultSettings.title || 'rmui-template'
const port = 233

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './', // router hash 模式使用
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/app/', //router history模式使用 需要区分生产环境和开发环境，不然build会报错
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,    
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js')
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // externals里的模块不打包
      Object.assign(config, {
        name: name,
        externals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          vant: 'vant',
          axios: 'axios'
        }
      })
    }
    // 开发环境配置
    // if (process.env.NODE_ENV === 'development') {
    // }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    config.resolve.alias
      .set('@', resolve('src'))

    const cdn = {
      dev: {
        css: [],
        js: []
      },
      build: {
        css: ['https://cdn.jsdelivr.net/npm/vant@beta/lib/index.css'],
        js: [
          'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.6/vue-router.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.1/vuex.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js',
          'https://cdn.jsdelivr.net/npm/vant@beta/lib/vant.min.js'
        ]
      }
    }
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          libs: {
            name: 'chunk-libs',
            chunks: 'initial', // only package third parties that are initially dependent
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
