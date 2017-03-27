const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const projectConf = require('./config')

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
        chunkFilename: '[id].[chunkhash].js',
        path: path.resolve(__dirname, '../' + projectConf.distDir)
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
            inject: true,
            NODE_ENV: 'prod',
            title: projectConf.templateTitle,
            filename: projectConf.templateOutput,
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeScriptTypeAttributes: true
            },
            chunksSortMode: 'dependency'
        }),
        new LodashWebpackPlugin({
            paths: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module, count) {
                return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new BundleAnalyzerPlugin()
    ]
})
