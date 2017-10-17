import { getHighlights, getOptions, getSourcePath } from './matchers';

const visit = require(`unist-util-visit`);
const path = require('path');
const fs = require('fs');

const generateCodeSandboxUrl = require('./get-codesandbox-url').default;

module.exports = ({ markdownAST }, { classPrefix = `language-` } = {}) => {
  visit(markdownAST, `paragraph`, paragraph => {
    const validParapgraph =
      paragraph.children.length === 1 && paragraph.children[0].type === 'link';

    if (!validParapgraph) {
      return;
    }

    const node = paragraph.children[0];

    if (!node.url.startsWith('source:')) {
      return;
    }

    const sourcePath = getSourcePath(node.url);
    const highlights = getHighlights(node.url) || '';
    const codesandboxOptions = getOptions(node.url) || '';

    const absoluteSourcePath = path.join(process.cwd(), sourcePath);

    if (!fs.existsSync(absoluteSourcePath)) {
      throw new Error(`Cannot find source in ${absoluteSourcePath}`);
    }

    const sourceCode = fs
      .readFileSync(absoluteSourcePath)
      .toString()
      .trim();

    const codeSandboxUrl = generateCodeSandboxUrl(
      sourcePath,
      (codesandboxOptions ? `&${codesandboxOptions}` : '') +
        (highlights ? `&highlights=${highlights}` : '')
    );

    node.url = codeSandboxUrl;

    paragraph.children.unshift({
      type: 'code',
      lang: path.extname(sourcePath).slice(1) + highlights,
      value: sourceCode,
    });
  });
};
