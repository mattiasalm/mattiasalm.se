import elements from './elements';
import utils from './utils';
import load from './load';
import config from './config';
import navigation from './navigation';

//
// On window load event (when all linked resources has been loaded)
// read path from window URL and load content corresponding to that
// also load nav content
const onLoad = () => {
  const timeStart = performance.now();
  Promise.all([load.content(navigation.currentPath()), load.nav()]).then(() => {
    navigation.updateActiveLinksInMenu();
    utils.hideSplashLoading(performance.now() - timeStart);
  });
};

//
// Catch all click events that has and anchor as target
// and prevent all relative link paths from reloading the page.
// Load the new content in the #content container instead
const onClick = (event: MouseEvent) => {
  // Turn of keyboard navigation highlight
  if (event.clientX && event.clientY && elements.bodyElem instanceof Element) {
    elements.bodyElem.classList.remove(
      config.general.keyboardNavigationClassName,
    );
  }

  if (event.target instanceof Element) {
    const clickedElement: Element = event.target;

    // Dont do anything if the clicked target is not an A-tag
    if (clickedElement.tagName.toLowerCase() !== 'a') {
      return;
    }

    // Check if the path is relative to this site
    const path = clickedElement.getAttribute('href');
    if (!!path && utils.isRelativeUrl(path)) {
      // Check if the link target is intended to be opened in a new tab or window.
      const newTab =
        (utils.isMac() && event.metaKey) || (!utils.isMac() && event.ctrlKey);
      const newWindow = event.shiftKey;

      if (newTab || newWindow) {
        return;
      }

      // Load new content based on relative link path
      event.preventDefault();
      navigation.closeMenu();
      load.content(path).then(() => navigation.updateActiveLinksInMenu());
    }
  }
};

//
// When back button is clicked in browser update the content
// corresponding to the path
const onPopState = (event: PopStateEvent) => {
  event.preventDefault();
  navigation.closeMenu();
  load
    .content(navigation.currentPath())
    .then(() => navigation.updateActiveLinksInMenu());
};

const onKeyUp = (event: KeyboardEvent) => {
  // If using TAB key to navigate; enable keyboard navigation highlight by adding classname to body
  if (event.which === 9 && !!elements.bodyElem) {
    elements.bodyElem.classList.add(config.general.keyboardNavigationClassName);
  }

  // Close the menu by pressing ESC if it is open
  if (event.which === 27) {
    navigation.closeMenu();
  }
};

export default {
  onLoad,
  onClick,
  onPopState,
  onKeyUp,
};
