// import {
//   DEFAULT_DOS_DOM_ATTRIBUTE,
//   DEFAULT_DOS_PORT,
//   DEFAULT_DOS_URL_PATH,
// } from "./const";

// function launchEditor(
//   filePath,
//   config : {
//     urlPath : string;
//     devServerPort : string;
//   }
// ) {
//   if (!filePath) return;
//   const {urlPath = DEFAULT_DOS_URL_PATH,devServerPort =DEFAULT_DOS_PORT } = config
//   fetch(`https://localhost:${devServerPort}${urlPath}?filePath=-g ${filePath}`)
// }

// function openSourceCode(e, config) {
//   const { attribute, urlPath, devServerPort} = config;
//   if (e.altKey) {
//     e.preventDefault();
//     e.stopPropagation();
//     let targetTag = e.target;
//     if (!targetTag.hasAttribute(`${attribute}`)) {
//       targetTag = e.target.closest(`*[${attribute}]`);
//     }
//     const filePath =
//       (targetTag && targetTag.getAttribute(`${attribute}`)) || "";
//     launchEditor(filePath, {
//       urlPath,
//       devServerPort,
//     });
//   }
// }

// function ClientInit(
//   config: {
//     attribute?: string;
//     urlPath?: string;
//     devServerPort?:string;
//   } = {
//     attribute: DEFAULT_DOS_DOM_ATTRIBUTE,
//     urlPath: DEFAULT_DOS_URL_PATH,
//     devServerPort: DEFAULT_DOS_PORT
//   }
// ) {
//   document.addEventListener(
//     "click",
//     (e) => {
//       openSourceCode(e, config);
//     },
//     { capture: true }
//   );
// }

// export default ClientInit;


console.log('This is client')
