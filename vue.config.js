const webpack = require('webpack')
const path = require('path')

const devFlag = process.env.NODE_ENV === 'development'

function resolve(dir) {
    return path.join(__dirname, dir)
}

const plugins = [
    new webpack.ProvidePlugin({
        UserService: [resolve('./src/config/userInfo.js'), 'default'],
    }),
]

module.exports = {
    publicPath:
        process.env.VUE_APP_REALEASE === 'test'
            ? 'http://activities-test.mini.me/fe/spring-lottery/'
            : process.env.VUE_APP_REALEASE === 'prod'
                ? 'zhengshifu'
                : './',
    devServer: {
        open: true,
        disableHostCheck: true,
        proxy: {
            '/fp': {
                // target: "http://10.0.9.81:7601",
                target: "http://activities-test.mini.me/ny-fp/",
                changeOrigin: true
            },
            '/dev': {
                target: 'http://activities-test.mini.me/sso/api/auth',
                changeOrigin: true,
                pathRewrite: {
                    '^/dev': ''
                },
                cookieDomainRewrite: {
                    'activities-test.mini.me': 'localhost'
                },
            },
        }
    },
    //多页面配置
    pages: {
        main: {
            entry: './src/main.js',
            template: "public/index.html",
            filename: "./index.html",
            minify: {
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true
            },
            NODE_ENV: process.env.NODE_ENV,
            VUE_APP_REALEASE: process.env.VUE_APP_REALEASE
        }
    },
    configureWebpack: (config) => {
        let options = {
            plugins
        };
        return options
    },
    chainWebpack: config => {
        config.when(!devFlag, config => {
            config.plugins.delete('prefetch');
            config.optimization.minimizer('terser').tap((args) => {
                // 注释console.*
                args[0].terserOptions.compress.drop_console = true
                // remove debugger
                args[0].terserOptions.compress.drop_debugger = true
                // 移除 console.log
                args[0].terserOptions.compress.pure_funcs = ['console.log']
                return args
            })
        })

    },
}