function launchEditor(
  filePath,
  config: {
    urlPath: string;
  }
) {
  if (!filePath) return;
  const { urlPath } = config;
  fetch(`${window.location.origin}${urlPath}?filePath=-g ${filePath}`);
}

function createLinkForElement(nodeList, urlPath) {
  const tabFragment = document.createDocumentFragment();
  for (let i = 0; i < nodeList.length; i++) {
    let li = document.createElement("div");
    li.style.margin = "8px";
    li.innerHTML = `<span style='cursor: pointer;text-decoration: underline;color: #0000ff;'>${nodeList[i].filePath}</span>`;
    li.addEventListener("mouseenter", () => {
      // console.log('nodeList[i] is',nodeList[i])
      nodeList[i].node.classList.add("dos-selected-item");
    });
    li.addEventListener("mouseleave", () => {
      // console.log('nodeList[i] is',nodeList[i])
      nodeList[i].node.classList.remove("dos-selected-item");
    });
    li.addEventListener("click", () => {
      // console.log('nodeList[i] is',nodeList[i])
      launchEditor(nodeList[i].filePath, {
        urlPath,
      });
    });

    tabFragment.appendChild(li);
  }
  return tabFragment;
}

function openSourceCode(e, config) {
  try {
    console.log("openSourceCode called e is", e);
    const { domAttribute, urlPath } = config;
    if (e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      if((window as any).wbadmt && (window as any).wbadmt.send){
        (window as any).wbadmt.send({
          eventid: 1319750,
        });
      }
      let targetTag = e.target;
      const dosContainer = document.getElementById("dos-container");
      const hasExist = Array.from(dosContainer.classList).includes("show");
      const dosContent = document.getElementById("dos-content");
      if (hasExist) {
        dosContent.innerHTML = "";
        dosContainer.classList.toggle("show");
      }
      dosContent.appendChild(
        createLinkForElement(
          findAllParentElement(targetTag, domAttribute),
          urlPath
        )
      );
      dosContainer.classList.toggle("show");
    }
  } catch (e) {
    console.error("DOSVue error in openSourceCode", e);
  }
}

function findAllParentElement(node, domAttribute) {
  const res = [];
  while (node && node.parentElement) {
    if (node === document.body) return res;
    if (node.hasAttribute(domAttribute)) {
      res.push({
        node,
        filePath: node.getAttribute(domAttribute),
      });
    }
    node = node.parentElement;
  }
  return res;
}

function ClientInit(config: { domAttribute?: string; urlPath?: string }) {
  const { domAttribute = "data-source-code-location", urlPath = "/code" } =
    config;
  console.log("ClientInit clicked", "config is", config);
  document.addEventListener(
    "click",
    (e) => {
      console.log("document click");
      openSourceCode(e, {
        domAttribute,
        urlPath,
      });
    },
    { capture: true }
  );
}

console.log("This is client");
