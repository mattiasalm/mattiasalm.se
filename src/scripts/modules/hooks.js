import elements from './elements';
import utils from './utils';
import modification from './modification';
import route from './route';
import load from './load';


//
// On window load event (when all linked resources has been loaded)
// read path from window URL and load content corresponding to that
// also load nav content
const onLoad = () => {
  const timeStart = performance.now();
  Promise.all([load.content(route.currentPath()), load.nav()]).then(() => {
    modification.setActiveLinks([...elements.navElem.querySelectorAll('a')], route.currentPath());
    const timing = performance.now() - timeStart;

    const splashMinDuration = 4000;
    if (timing > splashMinDuration) {
      elements.bodyElem.classList.remove('splash-loading');
    } else {
      setTimeout(() => {
        elements.bodyElem.classList.remove('splash-loading');
      }, splashMinDuration - timing);
    }
  });
};

//
// Catch all click events that has and anchor as target
// and prevent all relative link paths from reloading the page.
// Load the new content in the #content container instead
const onClick = event => {
  if (event.clientX && event.clientY) {
    elements.bodyElem.classList.remove('keyboard-nav');
  }

  if (!event.target.matches('a')) {
    return;
  }

  const path = event.target.getAttribute('href');
  if (path && utils.isRelativeUrl(path)) {
    const newTab =
      (utils.isMac() && event.metaKey) || (!utils.isMac() && event.ctrlKey);
    const newWindow = event.shiftKey;

    if (newTab || newWindow) {
      return;
    }

    event.preventDefault();
    elements.navElem.querySelector('input').checked = false;
    load.content(path).then(() => {
      modification.setActiveLinks([...elements.navElem.querySelectorAll('a')], route.currentPath());
    });
  }
};

//
// When back button is clicked in browser update the content
// corresponding to the path
const onPopState = event => {
  event.preventDefault();
  load.content(route.currentPath()).then(() => {
    modification.setActiveLinks([...elements.navElem.querySelectorAll('a')], route.currentPath());
  });
};

const onKeyUp = event => {
  if (event.which === 9) {
    elements.bodyElem.classList.add('keyboard-nav');
  }

  if (event.which === 27 && elements.navElem.querySelector('input').checked) {
    elements.navElem.querySelector('input').checked = false;
  }
};

export default {
  onLoad,
  onClick,
  onPopState,
  onKeyUp
};
