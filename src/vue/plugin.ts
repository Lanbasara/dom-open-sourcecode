import * as fs from "fs";
import * as path from 'path'
// import ClientInit from './client'
import { DEFAULT_INIT_CONFIG } from "./const";
import { DOSConfig } from "./type";
class DOSVueInsertScriptPlugin {
  options: any;
  constructor(options:DOSConfig = DEFAULT_INIT_CONFIG) {
    this.options = options
  }

  apply(compiler: {
    hooks: {
      compilation: {
        tap: (arg0: string, arg1: (compilation: any) => void) => void;
      };
    };
  }) {
    const code = fs.readFileSync(path.resolve(__dirname,'./client.js'));
    const scriptCode = `<script>${code}</script>`;

    compiler.hooks.compilation.tap(
      "compilation",
      (compilation: {
        hooks: {
          htmlWebpackPluginAfterHtmlProcessing: {
            tap: (arg0: string, arg1: (htmlPluginData: any) => void) => void;
          };
        };
      }) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
          "htmlWebpackPluginAfterHtmlProcessing",
          (htmlPluginData: { html: { toString: () => any } }) => {
            const htmlStr = htmlPluginData.html.toString();

            htmlPluginData.html = htmlStr.replace(
              /<\/body>/,
              scriptCode  + "</body>" 
            );
          }
        );
      }
    );
  }
}

export default DOSVueInsertScriptPlugin;
