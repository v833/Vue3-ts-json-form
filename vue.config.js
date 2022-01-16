const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const isLib = process.env.TYPE === 'lib'
module.exports = {
  lintOnSave: false,
  chainWebpack(config) {
    if (!isLib) {
      config.plugin('monaco').use(new MonacoEditorWebpackPlugin())
      // 检查循环引用
      config.plugin('circular').use(new CircularDependencyPlugin())
    }

  }
}