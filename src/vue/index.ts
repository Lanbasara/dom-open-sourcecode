import * as path from 'path'
import { DEFAULT_DOS_DOM_ATTRIBUTE, DEFAULT_DOS_PORT, DEFAULT_DOS_URL_PATH } from "./const";
import { DOSConfig } from "./type";
import createServerConfig from './server'
import DOSVueInsertScriptPlugin from './plugin'

class DOSVue implements DOSConfig {
  static hasInstance = false;
  static clientCreator;
  port = DEFAULT_DOS_PORT;
  domAttribute = DEFAULT_DOS_DOM_ATTRIBUTE;
  urlPath = DEFAULT_DOS_URL_PATH;
  serverConfig;
  loader;
  constructor(config?:Partial<DOSConfig>){
    if(DOSVue.hasInstance) throw 'There is already an instance'
    config.port && (this.port = config.port)
    config.domAttribute && (this.domAttribute = config.domAttribute)
    config.urlPath && (this.urlPath = config.urlPath)
    this.serverConfig = createServerConfig(this.urlPath)
    this.loader = path.resolve(__dirname,"./loader")
    DOSVue.hasInstance = true
  }
}
export { DOSVue , DOSVueInsertScriptPlugin}