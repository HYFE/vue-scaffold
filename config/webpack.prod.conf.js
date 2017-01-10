const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseConfig, {
    module: {
        loaders: [{
            test: /\.(css|less)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!less')
        }]
    },
    devtool: '#source-map',
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css?sourceMap!postcss?sourceMap'),
            less: ExtractTextPlugin.extract('vue-style-loader', 'css?sourceMap!postcss?sourceMap!less?sourceMap')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('assets/[name].[contenthash].css'),
        new HtmlWebpackPlugin({
            title: 'BCMP',
            filename: 'index.html',
            template: 'src/index.html',
            inject: true,
            NODE_ENV: 'prod',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeScriptTypeAttributes: true
            }
        })
    ]
})
