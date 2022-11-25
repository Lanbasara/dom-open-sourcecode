import { parse } from "@vue/compiler-sfc";
import { getOptions } from 'loader-utils';
function getInjectContent(ast, source, filePath, domAttribute="data-source-code-location") {
  if (ast.type === 1) {
    if (ast.children && ast.children.length) {
      for (let i = ast.children.length - 1; i >= 0; i--) {
        const node = ast.children[i];
        source = getInjectContent(node, source, filePath,domAttribute);
      }
    }
    const codeLines = source.split("\n");

    const line = ast.loc.start.line;

    const column = ast.loc.start.column;

    const columnToInject = column + ast.tag.length;

    const targetLine = codeLines[line - 1];

    console.log('getInjectContent domAttribute is',domAttribute)

    const newLine =
      targetLine.slice(0, columnToInject) +
      ` ${domAttribute}=${filePath}:${line}:${column}` +
      targetLine.slice(columnToInject);

    codeLines[line - 1] = newLine;

    source = codeLines.join("\n");
  }

  return source;
}

module.exports = function (source) {
  const templateSrc = source;
  
  const { resourcePath } = this

  const options = getOptions(this);

  console.log('loader options is', options.domAttribute)

  const vueFileContent = parse(templateSrc);
  if (
    vueFileContent &&
    vueFileContent.descriptor &&
    vueFileContent.descriptor.template &&
    vueFileContent.descriptor.template.ast
  ) {
    const domAst = vueFileContent.descriptor.template.ast;

    const templateSourceCode = domAst.loc.source;

    const newSourceCode = getInjectContent(
      domAst,
      templateSourceCode,
      resourcePath,
      options.domAttribute
    );
    const newConent = source.replace(templateSourceCode, newSourceCode);
    return newConent;
  } else {
    return source;
  }
};
