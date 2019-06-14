import Parser from "rss-parser";

const parser = new Parser();

function fetch(url) {
  return parser.parseURL(url);
}

export { fetch };
