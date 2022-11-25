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
  document.addEventListener(
    "click",
    (e) => {
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
