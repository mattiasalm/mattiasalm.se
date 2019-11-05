//
// Config
const config = {
  content: {
    folder: 'content',
  },
};

//
// Async wait function
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

//
// Check if url is considered to be a relative path
const isRelativeUrl = url => url.indexOf('://') < 1 && url.indexOf('//') !== 0;

//
// Remove leading slash in string
const stripLeadingSlash = str =>
  str.indexOf('/') === 0 ? str.substring(1) : str;

//
// Check if is running on a Mac
const isMac = () => window.navigator.appVersion.includes('Mac');

//
// Element references
var _elements = {};

//
// Set element reference
var setElement = (name, selector) =>
  (_elements[name] = document.querySelector(selector));

//
// Getters to element references that also triggers to set the
// reference if it is missing
var elements = {
  get body() {
    return _elements.body || setElement('body', 'body');
  },
  get nav() {
    return _elements.nav || setElement('nav', '#nav');
  },
  get contentNode() {
    return _elements.contentNode || setElement('contentNode', '#content');
  },
};

//
// Global loading handlers. Starts and stops
// full screen loading by setting the 'loading' attribute to body
var loading = {
  isLoading: () => elements.body.hasAttribute('loading'),
  start: () =>
    !loading.isLoading() && elements.body.setAttribute('loading', ''),
  stop: () => loading.isLoading() && elements.body.removeAttribute('loading'),
};

//
// Fade content handlers. Starts and stops
// content section fading by setting the 'fade' attribute to body
var fadeContentNode = {
  isLoading: () => elements.body.hasAttribute('fade'),
  start: () =>
    !fadeContentNode.isLoading() && elements.body.setAttribute('fade', ''),
  stop: () =>
    fadeContentNode.isLoading() && elements.body.removeAttribute('fade'),
};

//
// Get current path from window URL
const getPath = () => window.location.pathname;

//
// Add new history entry and update the path
const updatePath = path => {
  const currentPath = getPath();
  if (currentPath === path) {
    return;
  }
  history.pushState('', path, path);
};

//
// Async fetch content from URL and return as text
async function getHtmlFromUrl(url) {
  const response = await fetch(url);
  if (response.status >= 400 && response.status < 600) {
    throw new Error('File not found');
  }
  return await response.text();
}

//
// Add child node to parent element
const addChildNode = (parent, child) => parent.appendChild(child);

//
// Remove all child nodes in parent element
const removeChildNodes = parent => {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
};

//
// Create element nodes from HTML text string
const createNodesFromHtml = html => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
};

//
// Create full URL from path and append content folder and extension
const createUrlFromPath = path => {
  let newPath = stripLeadingSlash(path);
  if (newPath === '') {
    newPath = 'index';
  }
  return `${config.content.folder}/${newPath}.html`;
};

//
// Fetch new content based on path and mount it in the DOM #content container
async function goToRoutePath(path) {
  const url = createUrlFromPath(path);
  const html = await getHtmlFromUrl(url).catch(err => {
    // CHECK STATUS HERE
    if (path !== '/404') {
      return goToRoutePath('/404');
    }
    throw new Error(err);
  });

  if (!!html) {
    fadeContentNode.start();
    await wait(320);
    removeChildNodes(elements.contentNode);
    createNodesFromHtml(html).forEach(child =>
      addChildNode(elements.contentNode, child)
    );
    updatePath(path);
    fadeContentNode.stop();
  }
}

//
// Fetch nav content and mount it in the DOM #nav container
async function loadNav() {
  const url = createUrlFromPath('/nav');
  const html = await getHtmlFromUrl(url).catch(err => {
    throw new Error(err);
  });

  if (!!html) {
    removeChildNodes(elements.nav);
    createNodesFromHtml(html).forEach(child =>
      addChildNode(elements.nav, child)
    );
  }
}

//
// Add class 'active-link' on all links in nav that match current path
// and remove class on the others
const setActiveLinksInNav = () => {
  const linkArray = Array.from(elements.nav.querySelectorAll('a'));

  const activeLinks = linkArray.filter(
    link =>
      stripLeadingSlash(link.getAttribute('href')) ===
      stripLeadingSlash(getPath())
  );
  const inactiveLinks = linkArray.filter(
    link =>
      stripLeadingSlash(link.getAttribute('href')) !==
      stripLeadingSlash(getPath())
  );

  activeLinks.forEach(link => {
    link.classList.add('active-link');
  });

  inactiveLinks.forEach(link => {
    link.classList.remove('active-link');
  });
};

//
// On window load event (when all linked resources has been loaded)
// read path from window URL and load content corresponding to that
// also load nav content
window.onload = () => {
  Promise.all([goToRoutePath(getPath()), loadNav()]).then(() => {
    loading.stop();
    setActiveLinksInNav();
  });
};

//
// Catch all click events that has and anchor as target
// and prevent all relative link paths from reloading the page.
// Load the new content in the #content container instead
window.onclick = event => {
  if (!event.target.matches('a')) {
    return;
  }

  const path = event.target.getAttribute('href');
  if (path && isRelativeUrl(path)) {
    const newTab = (isMac() && event.metaKey) || (!isMac() && event.ctrlKey);
    const newWindow = event.shiftKey;

    if (newTab || newWindow) {
      return;
    }

    event.preventDefault();
    elements.nav.querySelector('input').checked = false;
    goToRoutePath(path).then(() => {
      setActiveLinksInNav();
    });
  }
};

//
// When back button is clicked in browser update the content
// corresponding to the path
window.onpopstate = event => {
  event.preventDefault();
  goToRoutePath(getPath()).then(() => {
    setActiveLinksInNav();
  });
};
