const path = require('path')
const projectRoot = path.resolve(__dirname, '../')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../public/'),
        // publicPath: './public/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'components': 'src/components'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        preLoaders: [{
            test: /\.vue$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.(css|less)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!less')
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[hash:7].[ext]'
            }
        }]
    },
    vue: {
        loaders: {
            css: 'vue-style!css',
            less: 'vue-style!css!less'
        },
        postcss: [autoprefixer({
            browsers: ['last 3 versions']
        })]
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime'],
        comments: false
    },
    postcss: [autoprefixer({
        browsers: ['last 3 versions']
    })]
}
