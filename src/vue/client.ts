function launchEditor(
  filePath,
  config: {
    urlPath: string;
    devServerPort: string;
    host :string
  }
) {
  if (!filePath) return;
  const { urlPath, devServerPort,host } = config;
  fetch(`https://${host}:${devServerPort}${urlPath}?filePath=-g ${filePath}`);
}

function openSourceCode(e, config) {
  try {
    console.log('openSourceCode called e is',e)
    const { domAttribute, urlPath, devServerPort,host } = config;
    if (e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      let targetTag = e.target;
      if (!targetTag.hasAttribute(`${domAttribute}`)) {
        targetTag = e.target.closest(`*[${domAttribute}]`);
      }
      const filePath =
        (targetTag && targetTag.getAttribute(`${domAttribute}`)) || "";
      launchEditor(filePath, {
        urlPath,
        devServerPort,
        host
      });
    }
  } catch(e){
    console.error('DOSVue error in openSourceCode',e)
  }
}
function ClientInit(config: {
  domAttribute? : string;
  urlPath? : string;
  devServerPort? : string;
  host?:string
}) {
  const {
    domAttribute = "data-source-code-location",
    urlPath = "/code",
    devServerPort = "8090",
    host = "https//localhost"
  } = config;
  console.log('ClientInit clicked','config is',config)
  document.addEventListener(
    "click",
    (e) => {
      console.log('document click')
      openSourceCode(e, {
        domAttribute,
        urlPath,
        devServerPort,
        host
      });
    },
    { capture: true }
  );
}

console.log("This is client");
