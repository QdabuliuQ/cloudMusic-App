const { default: VueRouter } = require("vue-router")

module.exports = {
    configureWebpack:{
        resolve:{
            alias: {
                // 路径别名
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
                'icon':'@/assets/icon',
            }
        }
    },

    chainWebpack: config => {
        // 指定不同环境下的入口文件
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                VueLazyLoad: 'vue-lazyload',
                moment: 'moment',
                vant: 'vant'
            })

            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}