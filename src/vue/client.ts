function launchEditor(
  filePath,
  config : {
    urlPath : string;
    devServerPort : string;
  }
) {
  if (!filePath) return;
  const {urlPath,devServerPort  } = config
  fetch(`https://localhost:${devServerPort}${urlPath}?filePath=-g ${filePath}`)
}

function openSourceCode(e, config) {
  const { attribute, urlPath, devServerPort} = config;
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
      devServerPort,
    });
  }
}

function ClientInit(
  config: {
    attribute?: string;
    urlPath?: string;
    devServerPort?:string;
  } = {
    attribute: "data-source-code-location",
    urlPath: "/code",
    devServerPort: "8090"
  }
) {
  document.addEventListener(
    "click",
    (e) => {
      openSourceCode(e, config);
    },
    { capture: true }
  );
}

ClientInit()
console.log('This is client')

// export default ClientInit;


