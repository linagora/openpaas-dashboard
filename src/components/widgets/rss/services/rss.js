import Parser from "rss-parser";
// TODO: Define the proxy as part of OP
const PROXY = "https://cors-anywhere.herokuapp.com/";
const parser = new Parser();

function fetch(url) {
  return parser.parseURL(`${PROXY}${url}`);
}

export { fetch };
