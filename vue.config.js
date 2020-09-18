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
                // 'node':''
            }
        }
    }
}