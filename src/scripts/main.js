import elements from './modules/elements';
import utils from './modules/utils';
import fetching from './modules/fetching';
import modification from './modules/modification';
import route from './modules/route';
import nodes from './modules/nodes';

var load = {
  //
  // Fetch new content based on path and mount it in the DOM #content container
  async content(path) {
    const url = utils.createUrlFromPath(path);
    const html = await fetching.getHtmlFromUrl(url).catch(err => {
      // CHECK STATUS HERE
      if (path !== '/404') {
        return load.content('/404');
      }
      throw new Error(err);
    });

    if (!!html) {
      elements.body.classList.add('fade');
      // bodyAttribute.add('fade');
      await utils.wait(320);
      nodes.replaceNodesFromHtml(elements.contentNode, html);
      route.path = path;
      elements.body.classList.remove('fade');
      // bodyAttribute.remove('fade');
    }
  },

  //
  // Fetch nav content and mount it in the DOM #nav container
  async nav() {
    const url = utils.createUrlFromPath('/nav');
    const html = await fetching.getHtmlFromUrl(url).catch(err => {
      throw new Error(err);
    });

    if (!!html) {
      nodes.replaceNodesFromHtml(elements.nav, html);
    }
  },
};

var hooks = {
  //
  // On window load event (when all linked resources has been loaded)
  // read path from window URL and load content corresponding to that
  // also load nav content
  onLoad: () => {
    const timeStart = performance.now();
    Promise.all([load.content(route.path), load.nav()]).then(() => {
      modification.setActiveLinks([...elements.nav.querySelectorAll('a')], route.path);
      const timing = performance.now() - timeStart;
      const splashMinDuration = 4000;
      if (timing > splashMinDuration) {
        elements.body.classList.remove('splash-loading');
      } else {
        setTimeout(() => {
          elements.body.classList.remove('splash-loading');
        }, splashMinDuration - timing);
      }
    });
  },

  //
  // Catch all click events that has and anchor as target
  // and prevent all relative link paths from reloading the page.
  // Load the new content in the #content container instead
  onclick: event => {
    if (event.clientX && event.clientY) {
      elements.body.classList.remove('keyboard-nav');
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
      elements.nav.querySelector('input').checked = false;
      load.content(path).then(() => {
        modification.setActiveLinks([...elements.nav.querySelectorAll('a')], route.path);
      });
    }
  },

  //
  // When back button is clicked in browser update the content
  // corresponding to the path
  onpopstate: event => {
    event.preventDefault();
    load.content(route.path).then(() => {
      modification.setActiveLinks([...elements.nav.querySelectorAll('a')], route.path);
    });
  },

  onkeyup: event => {
    if (event.which === 9) {
      elements.body.classList.add('keyboard-nav');
    }

    if (event.which === 27 && elements.nav.querySelector('input').checked) {
      elements.nav.querySelector('input').checked = false;
    }
  },
};

window.onload = hooks.onLoad;
window.onclick = hooks.onclick;
window.onpopstate = hooks.onpopstate;
window.onkeyup = hooks.onkeyup;
