const { DOSVue, DOSVueInsertScriptPlugin } = require('../../dist/vue')
const DosVueConfig = {
    port : '3000'
}
const dosVue = new DOSVue(DosVueConfig)
module.exports = {
    devServer : {
        port : 3000,
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
        plugins: [new DOSVueInsertScriptPlugin(DosVueConfig)]
    }
}