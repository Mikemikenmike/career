var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
    new HtmlWebpackPlugin({
        chunks: ['index'],
        title: "Index",
        filename: "index.html",
        template: "src/html/index.html"
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "React": "react"
    })
];


module.exports = {
    entry: {
        index: "./src/index.jsx"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(ogg|m4v|mp4|png|jpg|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file-loader'
            }
        ],
        exprContextCritical: false
    },
    plugins: plugins,
    devtool: 'source-map'
};