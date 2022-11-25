function launchEditor(
  filePath,
  config: {
    urlPath: string;
    devServerPort: string;
  }
) {
  if (!filePath) return;
  const { urlPath, devServerPort } = config;
  fetch(`https://localhost:${devServerPort}${urlPath}?filePath=-g ${filePath}`);
}

function openSourceCode(e, config) {
  try {
    console.log('openSourceCode called e is',e)
    const { domAttribute, urlPath, devServerPort } = config;
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
}) {
  const {
    domAttribute = "data-source-code-location",
    urlPath = "/code",
    devServerPort = "8090",
  } = config;
  console.log('ClientInit clicked','document is',document)
  document.addEventListener(
    "click",
    (e) => {
      console.log('document click')
      openSourceCode(e, {
        domAttribute,
        urlPath,
        devServerPort
      });
    },
    { capture: true }
  );
}

console.log("This is client");
