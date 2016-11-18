const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach( name => {
    baseConfig.entry[name] = ['./config/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
    devtool: '#eval-source-map',
    output: {
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].css"),
        // new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        })
    ]
})
