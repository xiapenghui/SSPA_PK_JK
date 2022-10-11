module.exports = {
    // 区分打包环境与开发环境
    assetsDir: 'static',
    parallel: false,
    publicPath: './',
    configureWebpack: () => {},

    devServer: {
        port: 8080, //服务器8080
        disableHostCheck: true,
        proxy: { // 设置代理
            '/api': {
                target: 'http://192.168.1.125:8527', 
                changeOrigin: true,
                pathRewrite: { // 重写路径
                    '^/api': ''
                }
            },
			'/api_product': {
			    target: 'http://192.168.1.125:8527', //发布
			    changeOrigin: true,
			    pathRewrite: { // 重写路径
			        '^/api_product': ''
			    }
			}
        },
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}