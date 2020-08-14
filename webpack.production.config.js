const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const srcDir = 'src';
const dstDir = 'dist';

module.exports = {
    entry: `./${srcDir}/index.ts`,
    mode: "production",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, dstDir),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: [
                    path.resolve(__dirname, srcDir)
                ],
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: "raw-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/i,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, srcDir)
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
            template: `${srcDir}/index.html`,
            inject: "body"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: `assets` }

            ],
        })
    ]
};