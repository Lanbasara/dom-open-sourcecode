/**
 * @DOSVue : constructor
 * @DOSVueInsertScriptPlugin : Webpack Plugin
 */
const {
  DOSVue,
  DOSVueInsertScriptPlugin,
} = require("dom-open-sourcecode/dist/vue");

const DOSVueConfig: {
  // The port of your devServer you have launched
  port: string;

  // The attribute key you would like to attached on DOM element which use 'data-source-code-location' as default
  domAttribute?: string;

  // The url path you would like to use for this function which use '/code' as default
  urlPath?: string;
} = {
  port: "8080",
};

// Step1 : new DOSVue instance
const dosVue = new DOSVue(DOSVueConfig);

module.exports = {
  devServer: {
    port: 8080,
    // Step2 : Insert dosVue.serverConfig,
    ...dosVue.serverConfig,
    // ......
  },
  chainWebpack: (config) => {
    // Step3 : config dosVue loader

    /**
     * Although this loader dont not break your logic code or do any things which have some sideeffects
     * The only thing this loader do this to attched one customized attribute on some DOM elements
     * But I still recommend turning it on only when developing locally
     */
    if (process.env.NODE_ENV === "development") {
      config.module.rule("vue").use(dosVue.loader).loader(dosVue.loader).end();
    }
    // ......
  },
  // ......
  configureWebpack: {
    // Step4 : config DOS plugin
    plugins: [new DOSVueInsertScriptPlugin(DOSVueConfig)],
    // ......
  },
};
