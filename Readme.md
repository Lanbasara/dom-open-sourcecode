# Dom-Open-Sourcecode

A handy tool that helps developers quickly find source code from the DOM and evoke the IDE

## Usage

> Untill now (< 1.0.0), this tool only supports Vue, and plans to support React after version 1.0.0

## Install

```
npm install dom-open-sourcecode -D
```

### Vue

Only need to config in vue.config.js

```ts
/**
 * @DOSVue : constructor
 * @DOSVueInsertScriptPlugin : Webpack Plugin
 */
const {
  DOSVue,
  DOSVueInsertScriptPlugin,
} = require("dom-open-sourcecode");

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
    /**
     * Although this loader will not break your logic code or do any things which have some sideeffects
     * The only thing this loader do this to attched one customized attribute on some DOM elements
     * But I still recommend turning it on only when developing locally
     */

    // Step3 : config dosVue loader
    config.module.rule("vue").use(dosVue.loader).loader(dosVue.loader).end();
    // ......
  },
  // ......
  configureWebpack: {
    // Step4 : config DOS plugin
    plugins: [new DOSVueInsertScriptPlugin(DOSVueConfig)],
    // ......
  },
};
```
