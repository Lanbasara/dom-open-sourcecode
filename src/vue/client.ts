function launchEditor(
  filePath,
  config: {
    urlPath: string;
    port: string;
    host :string
  }
) {
  if (!filePath) return;
  const { urlPath, port,host } = config;
  fetch(`https://${host}:${port}${urlPath}?filePath=-g ${filePath}`);
}

function openSourceCode(e, config) {
  try {
    console.log('openSourceCode called e is',e)
    const { domAttribute, urlPath, port,host } = config;
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
        port,
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
  port? : string;
  host?:string
}) {
  const {
    domAttribute = "data-source-code-location",
    urlPath = "/code",
    port = "8090",
    host = "localhost"
  } = config;
  console.log('ClientInit clicked','config is',config)
  document.addEventListener(
    "click",
    (e) => {
      console.log('document click')
      openSourceCode(e, {
        domAttribute,
        urlPath,
        port,
        host
      });
    },
    { capture: true }
  );
}

console.log("This is client");
