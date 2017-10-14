const branch = require('git-branch');
const username = require('git-username');

export default function getSandboxUrl(path, options) {
  let currentBranch;
  let currentUsername;

  // Check whether the build is happening on Netlify
  if (process.env.REPOSITORY_URL) {
    const usernameParts = process.env.REPOSITORY_URL.match(
      /github.com[:|\/](.*)\/reactjs\.org/
    );
    currentUsername = usernameParts[1];
    currentBranch = process.env.BRANCH;
  } else {
    currentBranch = branch.sync();
    currentUsername = username();
  }

  if (!currentBranch) {
    throw new Error('Could not fetch branch from the git info.');
  }
  if (!currentUsername) {
    throw new Error('Could not fetch username from the git info.');
  }

  return `https://codesandbox.io/embed/github/${currentUsername}/reactjs.org/tree/${currentBranch}/${path}?codemirror=1&hidenavigation=1${options}`;
}
