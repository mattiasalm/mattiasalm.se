import utils from './utils';
import elements from './elements';
import nodes from './nodes';
import navigation from './navigation';
import config from './config';

//
// Fetch new content based on path and mount it in the DOM #content container
const content = async (path: string) => {
  const url = utils.createContentUrlFromPath(path);
  const html = await utils.getHtmlFromUrl(url).catch(err => {
    // CHECK STATUS HERE
    if (path !== config.fileNotFoundPath) {
      return content(config.fileNotFoundPath);
    }
    throw new Error(err);
  });

  if (!!html && elements.contentElem) {
    if (!!config.pageLoadClassName && elements.bodyElem) {
      elements.bodyElem.classList.add(config.pageLoadClassName);
      if (config.pageLoadDuration > 0) {
        await utils.wait(config.pageLoadDuration);
      }
      nodes.replaceNodesFromHtmlString(elements.contentElem, html);
      navigation.setNewPath(path);
      elements.bodyElem.classList.remove(config.pageLoadClassName);
    }
  }
};

//
// Fetch nav content and mount it in the DOM #nav container
const nav = async () => {
  const url = utils.createContentUrlFromPath(config.navContentPath);
  const html = await utils.getHtmlFromUrl(url).catch(err => {
    throw new Error(err);
  });

  if (!!html && !!elements.navElem) {
    nodes.replaceNodesFromHtmlString(elements.navElem, html);
  }
};

export default {
  content,
  nav,
};
