import * as fs from "fs";
import * as path from 'path'
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
    const ClientCode = fs.readFileSync(path.resolve(__dirname,'./client.js'));
    const scriptCode = `
    <script>${ClientCode}</script>
    <script>ClientInit(${JSON.stringify(this.options)})</script>
    <div id="dos-container" wb-data-click wb-data-eventid="1319750">
  <div id="dos-close"></div>
  <div id="dos-content"></div>
</div>
<style>
  .dos-selected-item {
    border : 1px solid blue;
  }
  #dos-container {
    position: fixed;
    bottom: 0;
    left: 0;
    max-width : 80%;
    min-width : 80%;
    background-color: rgb(249, 241, 219,0.7);
    z-index: 999999;
    display: none;
  }
  #dos-container.show {
    display: block;
  }
  #dos-close {
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    overflow: hidden;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
  #dos-close::before,
  #dos-close::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #000;
  }
  #dos-close::before {
    transform: rotate(45deg);
  }
  #dos-close::after {
    transform: rotate(-45deg);
  }
</style>
<script>
    (function addDosClose(){
        const dosCloseButton = document.getElementById('dos-close')
        dosCloseButton.addEventListener('click',() => {
            const dosContainer = document.getElementById('dos-container')
            const dosContent = document.getElementById('dos-content')
            dosContent.innerHTML = ''
            dosContainer.classList.toggle('show')
        })
    })()
</script>
    `;

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
