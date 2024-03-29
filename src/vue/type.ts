import DOSVueInsertScriptPlugin from "./plugin";

export interface DOSConfig {
  domAttribute?: string;
  urlPath?:string;
}

export interface DOSInstance extends DOSConfig  {
  serverConfig : {
    before : (app:any) => void
  },
  loader : string;
  plugin : () => DOSVueInsertScriptPlugin
}