const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'development', 
    entry:'./src/index.ts', // 入口文件
    output: { // 出口文件
        path:path.resolve('./dist'),
        filename:'script/boundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module:{
        rules:[
            {
                test:/.ts$/,
                use:{
                    loader:'ts-loader',
                    options:{
                        transpileOnly:true, // 处理 webpack-dev-server 与 ts-loader 联合使用报错问题
                    }
                }
            }
        ]
    },
    resolve:{
        extensions:['.ts','.js']
    }
}