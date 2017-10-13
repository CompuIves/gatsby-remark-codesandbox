const branch = require('git-branch');
const username = require('git-username');

export default function getSandboxUrl(path) {
  const currentBranch = branch.sync();
  const currentUsername = username();

  return `https://codesandbox.io/embed/github/${currentUsername}/reactjs.org/tree/${currentBranch}/${path}?codemirror=1&hidenavigation=1`;
}
