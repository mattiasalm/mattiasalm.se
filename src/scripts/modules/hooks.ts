import elements from './elements';
import utils from './utils';
import modification from './modification';
import route from './route';
import load from './load';

const closeNavMenu = () => {
  if (!!elements.navElem) {
    const inputElem = elements.navElem.querySelector('input');
    if (!!inputElem && inputElem.checked) {
      inputElem.checked = false;
    }
  }
};

const updateActiveLinksInNav = () => {
  if (!!elements.navElem) {
    const linkElements = elements.navElem.querySelectorAll('a');
    modification.setActiveLinks(
      [...Array.from(linkElements)],
      route.currentPath(),
    );
  }
};

//
// On window load event (when all linked resources has been loaded)
// read path from window URL and load content corresponding to that
// also load nav content
const onLoad = () => {
  const timeStart = performance.now();
  Promise.all([load.content(route.currentPath()), load.nav()]).then(() => {
    updateActiveLinksInNav();
    const timing = performance.now() - timeStart;

    const splashMinDuration = 4000;
    if (timing > splashMinDuration) {
      if (!!elements.bodyElem) {
        elements.bodyElem.classList.remove('splash-loading');
      }
    } else {
      setTimeout(() => {
        if (!!elements.bodyElem) {
          elements.bodyElem.classList.remove('splash-loading');
        }
      }, splashMinDuration - timing);
    }
  });
};

//
// Catch all click events that has and anchor as target
// and prevent all relative link paths from reloading the page.
// Load the new content in the #content container instead
const onClick = (event: MouseEvent) => {
  // Turn of keyboard navigation highlight
  if (event.clientX && event.clientY && elements.bodyElem) {
    elements.bodyElem.classList.remove('keyboard-nav');
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
      load.content(path).then(() => {
        updateActiveLinksInNav();
        closeNavMenu();
      });
    }
  }
};

//
// When back button is clicked in browser update the content
// corresponding to the path
const onPopState = (event: PopStateEvent) => {
  event.preventDefault();
  load.content(route.currentPath()).then(() => {
    updateActiveLinksInNav();
    closeNavMenu();
  });
};

const onKeyUp = (event: KeyboardEvent) => {
  // If using TAB key to navigate; enable keyboard navigation highlight by adding classname to body
  if (event.which === 9 && !!elements.bodyElem) {
    elements.bodyElem.classList.add('keyboard-nav');
  }

  // Close the menu by pressing ESC if it is open
  if (event.which === 27) {
    closeNavMenu();
  }
};

export default {
  onLoad,
  onClick,
  onPopState,
  onKeyUp,
};
