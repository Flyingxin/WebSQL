const { defineConfig } = require('@vue/cli-service')
// const CompressionPlugin = require("compression-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  lintOnSave: false, // 语法检查
  productionSourceMap: true, // 源代码映射

  // @重定位到src文件夹
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.module
      .rule('wasm')
      .test(/\.wasm$/)
      .use('wasm-loader')
      .loader('wasm-loader')
      .end()
  },

  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
      },
    },
    plugins: [
      new NodePolyfillPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, './src/utils/seuif97.wasm'),
            to: path.join(__dirname, './dist/js/seuif97.wasm')
          },
        ]
      }
      )
    ],
  },
  // chainWebpack: config => {
  //   //最小化代码
  //   config.optimization.minimize(true);
  //   //分割代码
  //   config.optimization.splitChunks({
  //     chunks: 'all'
  //   });
  //   //开启图片压缩
  //   config.module.rule('images')
  //     .test(/\.(png|jpe?g|gif|svg|ttf|woff)(\?.*)?$/)
  //     .use('image-webpack-loader')
  //     .loader('image-webpack-loader')
  //     .options({ bypassOnDebug: true })
  //   //开启gzip加速
  //   config.plugin('compressionPlugin')
  //     .use(new CompressionPlugin({
  //       test: /\.js$|\.html$|.\css$|\.otf$|\.ttf/, // 匹配文件名
  //       threshold: 102400, // 对超过100kb的数据压缩
  //       deleteOriginalAssets: false // 不删除源文件
  //     }))
  // }
})
