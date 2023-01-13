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

function openSourceCode(e, config) {
  try {
    console.log('openSourceCode called e is',e)
    const { domAttribute, urlPath } = config;
    if (e.altKey) {
      e.preventDefault();
      e.stopPropagation();
      let targetTag = e.target;
      console.log('all parent element is',findAllParentElement(targetTag,domAttribute))
      const dosContainer = document.getElementById('dos-container')
      dosContainer.classList.toggle('show')
      // if (!targetTag.hasAttribute(`${domAttribute}`)) {
      //   targetTag = e.target.closest(`*[${domAttribute}]`);
      // }
      // const filePath =
      //   (targetTag && targetTag.getAttribute(`${domAttribute}`)) || "";
      // launchEditor(filePath, {
      //   urlPath,
      // });
    }
  } catch(e){
    console.error('DOSVue error in openSourceCode',e)
  }
}

function findAllParentElement(node,domAttribute){
  const res = []
  while(node && node.parentElement){
    if(node === document.body) return res
    if(node.hasAttribute(domAttribute)){
      res.push(node)
    }
    node = node.parentElement
  }
  return res
}

function ClientInit(config: {
  domAttribute? : string;
  urlPath? : string;
}) {
  const {
    domAttribute = "data-source-code-location",
    urlPath = "/code",
  } = config;
  console.log('ClientInit clicked','config is',config)
  document.addEventListener(
    "click",
    (e) => {
      console.log('document click')
      openSourceCode(e, {
        domAttribute,
        urlPath,
      });
    },
    { capture: true }
  );
  
}

console.log("This is client");
