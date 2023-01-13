const { DOSVue, DOSVueInsertScriptPlugin } = require('../../dist/vue')
const dosVue = new DOSVue()
module.exports = {
    devServer : {
        port : 3235,
        ...dosVue.serverConfig
    },
    chainWebpack : (config) => {
        config.module
        .rule('vue')
        .use(dosVue.loader)
        .loader(dosVue.loader)
        .end();
    },
    configureWebpack : {
        plugins: [new DOSVueInsertScriptPlugin()]
    }
}