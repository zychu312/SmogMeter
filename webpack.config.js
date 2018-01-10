var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransformObjectAssign = require('babel-plugin-transform-object-assign');
var configBundle = {
    entry: './Frontend/js/Components/Index/init',
    output: {
        path: __dirname + '/Frontend/dist',
        filename: 'bundle.js'
    },
    devtool: 'none',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                    cacheDirectory: true
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000',
            }, {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ]
};

module.exports = [
    configBundle
];

