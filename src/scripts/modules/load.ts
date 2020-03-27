import {
  addClassFromElement,
  removeClassFromElement,
  createContentUrlFromPath,
  getHtmlFromUrl,
  wait,
} from './utils';
import { setNewPath } from './navigation';
import { config } from './config';
import { elementReference } from './elements';
import { replaceNodesFromHtmlString } from './nodes';

//
// Fetch new content based on path and mount it in the DOM #content container
export const loadContent = async (path: string) => {
  const url = createContentUrlFromPath(path);
  const html = await getHtmlFromUrl(url).catch(err => {
    // CHECK STATUS HERE
    if (path !== config.pathFileNotFound) {
      return loadContent(config.pathFileNotFound);
    }
    throw new Error(err);
  });

  if (!!html && elementReference.content) {
    if (!!config.classNamePageTransition) {
      addClassFromElement(
        elementReference.body,
        config.classNamePageTransition,
      );
      if (config.classNameRemovalDelayPageTransition > 0) {
        await wait(config.classNameRemovalDelayPageTransition);
      }
      replaceNodesFromHtmlString(elementReference.content, html);
      setNewPath(path);
      removeClassFromElement(
        elementReference.body,
        config.classNamePageTransition,
      );
    } else {
      replaceNodesFromHtmlString(elementReference.content, html);
      setNewPath(path);
    }
  }
};

//
// Fetch nav content and mount it in the DOM #nav container
export const loadNavigation = async () => {
  if (!config.pathToNavigationContent) {
    return Promise.resolve();
  }

  const url = createContentUrlFromPath(config.pathToNavigationContent);
  const html = await getHtmlFromUrl(url).catch(err => {
    throw new Error(err);
  });

  if (!!html && !!elementReference.navigation) {
    replaceNodesFromHtmlString(elementReference.navigation, html);
  }
};
