
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    // 入口
    entry: './src/index.ts',
    // 出口
    output: {
        // 打包文件夹
        path: path.resolve(__dirname, 'dist'),
        // 打包文件
        filename: 'index.js',
        // 打包生成库可以通过esm/commonjs/reqirejs的语法引入
        libraryTarget: 'umd', 
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: [/node_modules/],
          }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js']
    },
    plugins: [
      new CleanWebpackPlugin(),
    ]
}