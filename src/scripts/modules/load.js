import utils from "./utils";
import fetching from "./fetching";
import elements from "./elements";
import nodes from "./nodes";
import route from "./route";
import config from "./config";

//
// Fetch new content based on path and mount it in the DOM #content container
const content = async path => {
  const url = utils.createContentUrlFromPath(path);
  const html = await fetching.getHtmlFromUrl(url).catch(err => {
    // CHECK STATUS HERE
    if (path !== config.content.fileNotFoundPath) {
      return content(config.content.fileNotFoundPath);
    }
    throw new Error(err);
  });

  if (!!html) {
    if (config.content.loadingAddClass) {
      elements.bodyElem.classList.add(config.content.loadingClassName);
      if (config.content.loadingClassDelay > 0) {
        await utils.wait(config.content.loadingClassDelay);
      }
    }
    nodes.replaceNodesFromHtml(elements.contentElem, html);
    route.setNewPath(path);
    if (config.content.loadingAddClass) {
      elements.bodyElem.classList.remove(config.content.loadingClassName);
    }
  }
}

//
// Fetch nav content and mount it in the DOM #nav container
const nav = async () => {
  const url = utils.createContentUrlFromPath(config.content.navContentPath);
  const html = await fetching.getHtmlFromUrl(url).catch(err => {
    throw new Error(err);
  });

  if (!!html) {
    nodes.replaceNodesFromHtml(elements.navElem, html);
  }
}

export default {
  content,
  nav,
};
