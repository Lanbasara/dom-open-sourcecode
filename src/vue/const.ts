import { DOSConfig } from "./type"

export const DEFAULT_DOS_PORT = '8080'
export const DEFAULT_DOS_URL_PATH = '/code'
export const DEFAULT_DOS_DOM_ATTRIBUTE = 'data-source-code-location'

export const DEFAULT_INIT_CONFIG : DOSConfig = {
  port : DEFAULT_DOS_PORT,
  urlPath : DEFAULT_DOS_URL_PATH,
  domAttribute : DEFAULT_DOS_DOM_ATTRIBUTE
}