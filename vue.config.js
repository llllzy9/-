let target = process.env.VUE_APP_BASEURL;
const version = new Date().getTime()
module.exports = {
    publicPath: "./",
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
            filename: `js/[name].${version}.js`,
            chunkFilename: `js/[name].${version}.js`
        },
    },
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true, //配置自动启动浏览器
        host: "localhost",
        https: false,
        hotOnly: true, //热更新
        port: 8578,
        proxy: {
            '/wsyu': {
                target: target,
                changeOrigin: true,
                pathRewrite: {
                    '/wsyu': '/wsyu'
                }
            }
        }
    }
}
