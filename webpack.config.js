'use strict'
// imports
const ManifestPlugin = require('webpack-manifest-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

// conf
const config = {
    entry: {
        main: ['./src/scss/main.scss', './src/js/main.js']
    },
    browsers: ['last 2 versions', 'ie > 9'],
    assets_url: '/build/',
    stylelint: './src/scss/**/*.scss',
    assets_path: __dirname + '/build/'
}

module.exports = {
    entry: config.entry,
    output: {
        path: config.assets_path,
        filename: 'main-[chunkhash].js',
        publicPath: config.assets_url
    },
    module: {
        rules: [
            // Linters
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: [/node_modules/],
                enforce: 'pre'
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        browsers: config.browsers
                                    }),
                                    (process.env.NODE_ENV == 'production' ? require('cssnano') : function(){})
                                ]
                            }
                        },
                        {
                          loader: 'sass-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('main-[chunkhash].css')
            },
            allChunks: true
        }),
        new CleanWebpackPlugin([config.assets_path]),
        new FriendlyErrorsWebpackPlugin(),
        new StyleLintPlugin({
            files: config.stylelint
        }),
        new ManifestPlugin({
            fileName: 'manifest.json',
            basePath: config.assets_url
        })
    ],
    performance: {
        hints: (process.env.NODE_ENV == 'production' ? 'warning' : 'error')
    }
}
