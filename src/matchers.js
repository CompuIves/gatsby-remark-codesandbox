function getMatch(str, regex) {
  const regMatch = str.match(regex);

  if (regMatch) {
    return regMatch[1];
  }
}

export function getHighlights(url) {
  return getMatch(url, /{(.*)}/);
}

export function getOptions(url) {
  return getMatch(url, /\?(.*)/);
}

export function getSourcePath(url) {
  return (
    getMatch(url, /source:(.*)\{/) || // without highlights
    getMatch(url, /source:(.*)\?/) || // without options
    getMatch(url, /source:(.*)/) // clean
  );
}
