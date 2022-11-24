import DOSVueInsertScriptPlugin from "./plugin";

export interface DOSConfig {
  xhrInstance? : {get : any};
  domAttribute?: string;
  port?: string;
  urlPath?:string;
}

export interface DOSInstance extends DOSConfig  {
  serverConfig : {
    before : (app:any) => void
  },
  loader : string;
  plugin : () => DOSVueInsertScriptPlugin
}