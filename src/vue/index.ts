import * as path from 'path'
import { DEFAULT_DOS_DOM_ATTRIBUTE, DEFAULT_DOS_URL_PATH } from "./const";
import { DOSConfig } from "./type";
import createServerConfig from './server'
import DOSVueInsertScriptPlugin from './plugin'

class DOSVue implements DOSConfig {
  static hasInstance = false;
  static clientCreator;
  domAttribute = DEFAULT_DOS_DOM_ATTRIBUTE;
  urlPath = DEFAULT_DOS_URL_PATH;
  serverConfig;
  loader;
  constructor(config?:Partial<DOSConfig>){
    if(DOSVue.hasInstance) throw 'There is already an instance'
    config && config.domAttribute && (this.domAttribute = config.domAttribute)
    config && config.urlPath && (this.urlPath = config.urlPath)
    this.serverConfig = createServerConfig(this.urlPath)
    this.loader = path.resolve(__dirname,"./loader")
    DOSVue.hasInstance = true
  }
}
export { DOSVue , DOSVueInsertScriptPlugin}