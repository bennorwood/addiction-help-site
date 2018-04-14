(() => {
    'use strict';

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const webpack = require('webpack');
    const path = require('path');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');

    // Create multiple instances
    const MODULE_ROOT = process.cwd();
    const DIST_DIR = 'dist';
    
    // Create multiple instances
    const extractCSS  = new ExtractTextPlugin('stylesheets/[name].css');
    const extractSASS = new ExtractTextPlugin('stylesheets/[name].sass.css');
    
    module.exports = {
        entry: {
            index: './src/index.js'
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'jshint-loader'
                        }
                    ]
                },
                {
                    test: /\.(pug|jade)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'pug-loader'
                        }
                    ]
                },
                {
                    test: /\.(css)$/,
                    use: extractCSS.extract({use: ['css-loader']})
                },
                {
                    test: /\.(scss)$/,
                    use: extractSASS.extract({use: ['css-loader', 'sass-loader']})
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader'
                        }
                    ]
                }
            ]
        },
        output: {
            path: path.join(MODULE_ROOT, DIST_DIR)
        },
        plugins: [
            extractCSS,
            extractSASS,
            new webpack.LoaderOptionsPlugin({
                // test: /\.xxx$/, // may apply this only for some modules
                options: {
                    jshint: {
                        // any jshint option http://www.jshint.com/docs/options/
                        // i. e.
                        camelcase: true,

                        // jshint errors are displayed by default as warnings
                        // set emitErrors to true to display them as errors
                        emitErrors: true,

                        // jshint to not interrupt the compilation
                        // if you want any file with jshint errors to fail
                        // set failOnHint to true
                        failOnHint: true
                    }
                }
            }),
            new CleanWebpackPlugin([DIST_DIR], {
                root: MODULE_ROOT
            }),
            new HtmlWebpackPlugin({
                template: './src/index.pug',
                inject: 'head'
            }),
            new CopyWebpackPlugin([
                                    { from: 'src/videos/Valentines.mp4', to: 'videos/' },
                                    { from: 'src/videos/Valentines.webm', to: 'videos/' }
                                  ], {debug: true})
        ]
    };
})();
