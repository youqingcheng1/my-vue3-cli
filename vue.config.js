
module.exports = {
    publicPath:
        process.env.VUE_APP_REALEASE === 'test'
            ? 'http://fe-test.mini1.cn/y-activity/test/'
            : process.env.VUE_APP_REALEASE === 'prod'
                ? 'zhengshifu'
                : './',
    devServer: {
        open: true,
        proxy: {
            '/fn': {
                target: "http://activities-test.mini.me/refn",
                changeOrigin: true
            }
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
    chainWebpack:config=>{
        config.plugins.delete('prefetch');
    },
}