//
// Config
var config = {
  content: {
    folder: 'content',
  },
};

var utils = {
  //
  // Async wait function
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  //
  // Check if url is considered to be a relative path
  isRelativeUrl: url => url.indexOf('://') < 1 && url.indexOf('//') !== 0,

  //
  // Remove leading slash in string
  stripLeadingSlash: str => (str.indexOf('/') === 0 ? str.substring(1) : str),

  //
  // Check if is running on a Mac
  isMac: () => window.navigator.appVersion.includes('Mac'),

  //
  // Create full URL from path and append content folder and extension
  createUrlFromPath: path => {
    let newPath = utils.stripLeadingSlash(path);
    if (newPath === '') {
      newPath = 'index';
    }
    return `${config.content.folder}/${newPath}.html`;
  },

  //
  // Async fetch content from URL and return as text
  async getHtmlFromUrl(url) {
    const response = await fetch(url);
    if (response.status >= 400 && response.status < 600) {
      throw new Error('File not found');
    }
    return await response.text();
  },

  //
  // Add class 'active-link' on all links in nav that match current path
  // and remove class on the others
  setActiveLinksInNav: () => {
    const linkArray = Array.from(elements.nav.querySelectorAll('a'));

    // Set active
    linkArray
      .filter(
        link =>
          utils.stripLeadingSlash(link.getAttribute('href')) ===
          utils.stripLeadingSlash(route.path)
      )
      .forEach(link => {
        link.classList.add('active-link');
      });

    // Set inactive
    linkArray
      .filter(
        link =>
          utils.stripLeadingSlash(link.getAttribute('href')) !==
          utils.stripLeadingSlash(route.path)
      )
      .forEach(link => {
        link.classList.remove('active-link');
      });
  },
};

//
// Getters to element references that also triggers to set the
// reference if it is missing
var elements = {
  _elements: {},

  setElement: (name, selector) =>
    (elements._elements[name] = document.querySelector(selector)),

  get body() {
    return elements._elements.body || elements.setElement('body', 'body');
  },

  get nav() {
    return elements._elements.nav || elements.setElement('nav', '#nav');
  },

  get contentNode() {
    return (
      elements._elements.contentNode ||
      elements.setElement('contentNode', '#content')
    );
  },
};

//
//
var bodyAttribute = {
  hasAttribute: attribute => elements.body.hasAttribute(attribute),

  add: attribute =>
    !bodyAttribute.hasAttribute(attribute) &&
    elements.body.setAttribute(attribute, ''),

  remove: attribute =>
    bodyAttribute.hasAttribute(attribute) &&
    elements.body.removeAttribute(attribute),
};

var route = {
  get path() {
    return window.location.pathname;
  },

  set path(path) {
    if (route.path === path) {
      return;
    }
    history.pushState('', path, path);
  },
};

var nodes = {
  //
  // Add child node to parent element
  addChild: (parent, child) => parent.appendChild(child),

  //
  // Remove all child nodes in parent element
  removeChildren: parent => {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  },

  //
  // Create element nodes from HTML text string
  createNodesFromHtml: html => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  },

  replaceNodesFromHtml: (parent, html) => {
    // console.log(elements.contentNode.childNodes)
    // const config = { attributes: true, childList: true, subtree: true };
    // const observer = new MutationObserver((mutationList, observer) => {
    //   console.log(elements.contentNode.childNodes)
    //   console.log(Array.from(mutationList));
    // })
    // observer.observe(elements.contentNode, config);
    nodes.removeChildren(parent);
    nodes
      .createNodesFromHtml(html)
      .forEach(child => nodes.addChild(parent, child));
  },
};

var hooks = {
  //
  // On window load event (when all linked resources has been loaded)
  // read path from window URL and load content corresponding to that
  // also load nav content
  onLoad: () => {
    Promise.all([load.content(route.path), load.nav()]).then(() => {
      bodyAttribute.remove('splash-loading');
      utils.setActiveLinksInNav();
    });
  },

  //
  // Catch all click events that has and anchor as target
  // and prevent all relative link paths from reloading the page.
  // Load the new content in the #content container instead
  onclick: event => {
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
        utils.setActiveLinksInNav();
      });
    }
  },

  //
  // When back button is clicked in browser update the content
  // corresponding to the path
  onpopstate: event => {
    event.preventDefault();
    load.content(route.path).then(() => {
      utils.setActiveLinksInNav();
    });
  },
};

var load = {
  //
  // Fetch new content based on path and mount it in the DOM #content container
  async content(path) {
    const url = utils.createUrlFromPath(path);
    const html = await utils.getHtmlFromUrl(url).catch(err => {
      // CHECK STATUS HERE
      if (path !== '/404') {
        return load.content('/404');
      }
      throw new Error(err);
    });

    if (!!html) {
      bodyAttribute.add('fade');
      await utils.wait(320);
      nodes.replaceNodesFromHtml(elements.contentNode, html);
      route.path = path;
      bodyAttribute.remove('fade');
    }
  },

  //
  // Fetch nav content and mount it in the DOM #nav container
  async nav() {
    const url = utils.createUrlFromPath('/nav');
    const html = await utils.getHtmlFromUrl(url).catch(err => {
      throw new Error(err);
    });

    if (!!html) {
      nodes.replaceNodesFromHtml(elements.nav, html);
    }
  },
};

window.onload = hooks.onLoad;
window.onclick = hooks.onclick;
window.onpopstate = hooks.onpopstate;
