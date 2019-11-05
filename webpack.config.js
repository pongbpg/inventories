const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                loader: 'json-loader',
                test: /\.json$/
            },
            {
                test: /\.js$/, exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["react-hot-loader/babel"],
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']

            },
            // {
            //     test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'fonts/'
            //         }
            //     }]
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TOPSLIM INV.',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['!/assets/**/*']
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        historyApiFallback: true,
        // publicPath: '',
        // proxy: {
        //     '/api': 'http://127.0.0.1:3000'
        // },
        port: 8080
    },
}