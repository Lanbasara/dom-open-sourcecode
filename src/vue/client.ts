import {
  DEFAULT_DOS_DOM_ATTRIBUTE,
  DEFAULT_DOS_PORT,
  DEFAULT_DOS_URL_PATH,
} from "./const";

function launchEditor(
  filePath,
  config : {
    urlPath : string;
    devServerPort : string;
    axiosInstance?:any
  }
) {
  if (!filePath) return;
  const {urlPath = DEFAULT_DOS_URL_PATH,devServerPort =DEFAULT_DOS_PORT ,axiosInstance = null} = config
  if (axiosInstance) {
    axiosInstance.get(`https://localhost:${devServerPort}${urlPath}`, {
      params: {
        filePath: `-g ${filePath}`,
      },
    });
  } else {
    fetch(`https://localhost:${devServerPort}${urlPath}?filePath=-g ${filePath}`)
  }
}

function openSourceCode(e, config) {
  const { attribute, urlPath, devServerPort ,axiosInstance = null } = config;
  if (e.altKey) {
    e.preventDefault();
    e.stopPropagation();
    let targetTag = e.target;
    if (!targetTag.hasAttribute(`${attribute}`)) {
      targetTag = e.target.closest(`*[${attribute}]`);
    }
    const filePath =
      (targetTag && targetTag.getAttribute(`${attribute}`)) || "";
    launchEditor(filePath, {
      urlPath,
      axiosInstance,
      devServerPort,
    });
  }
}

function ClientInit(
  config: {
    attribute?: string;
    urlPath?: string;
    devServerPort?:string;
    axiosInstance?:any
  } = {
    attribute: DEFAULT_DOS_DOM_ATTRIBUTE,
    urlPath: DEFAULT_DOS_URL_PATH,
    devServerPort: DEFAULT_DOS_PORT
  }
) {
  requestIdleCallback(() => {
    document.addEventListener(
      "click",
      (e) => {
        openSourceCode(e, config);
      },
      { capture: true }
    );
  });
}

export default ClientInit;
