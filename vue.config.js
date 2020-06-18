/* eslint-disable */
const targetServer = 'http://localhost:3000';

module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: "dist", // where to put static assets (js/css/img/font/...) // 是否在保存时使用‘eslint-loader’进行检查 // 有效值: true | false | 'error' // 当设置为‘error’时，检查出的错误会触发编译失败
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: true, // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false, // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
        // 也可以是传递给 extract-text-webpack-plugin 的选项对象
        extract: true, // 允许生成 CSS source maps?
        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
        loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
        modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {

    },
    configureWebpack: () => {

    },
    devServer: {
        host: "0.0.0.0",
        port: 8088,
        https: false,
        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        // 支持post请求，但是会形成重定向会形成3次原因未知，待排查
        // before: (app) => {
        //     var bodyParser = require('body-parser');
        //     app.use(bodyParser.json());
        //     app.use(function (req, res, next) {
        //         if (req.method == "POST"){
        //             res.setHeader("Content-Type","application/json; charset=utf-8");
        //             let exp = /^(\/edwCommon)?(\/personCenter')?(\/edwDataApply)?/;
        //             let path = req.path.replace(exp, '');
        //             res.redirect('http://localhost:3000' + path);
        //         } else {
        //             next();
        //         }
        //     });
        // },
        proxy: {
            '/edwCommon': {
                changeOrigin: true,
                // target: 'http://cp01-rim-selfcare-ris04.cp01:8110/edwCommon',
                target: targetServer,
                pathRewrite: {
                    '^/edwCommon': ''
                }
            },
            '/personCenter': {
                changeOrigin: true,
                // target: 'http://cp01-rim-selfcare-ris04.cp01:8110/personCenter',
                target: targetServer,
                pathRewrite: {
                    '^/personCenter': ''
                }
            },
            '/edwDataApply': {
                changeOrigin: true,
                // target: 'http://cp01-rim-selfcare-ris04.cp01:8110/edwDataApply',
                target: targetServer,
                pathRewrite: {
                    '^/edwDataApply': ''
                }

            },
            '/edwTypeInfo': {
                changeOrigin: true,
                // target: 'http://cp01-rim-selfcare-ris04.cp01:8110/edwDataApply',
                target: targetServer,
                pathRewrite: {
                    '^/edwTypeInfo': ''
                }

            }
        }
    }
}