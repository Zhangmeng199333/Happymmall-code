/*
 * @Author: YQ 
 * @Date: 2017-12-21 16:43:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-22 14:44:28
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
//获取html-webapck-plugin参数的方法
var getHtmlConfig = function (name) {
    return {
        template: './src/view/' + name+ '.html',
        filename: 'view/'+ name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
};
//webpack.config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery',
    },
    module: {
        loaders: [
            {test: /\.css$/,loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader: 'url-loaderlimit=100&name/resource/[name].[ext]'}
        ]
    },
    plugins: [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),        
    ]
};
module.exports = config;