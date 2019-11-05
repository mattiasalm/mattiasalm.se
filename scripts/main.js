// Config
const config = {
  content: {
    folder: 'content',
  },
};

// Util
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const isRelativeUrl = url => url.indexOf('://') < 1 && url.indexOf('//') !== 0;

const stripLeadingSlash = str =>
  str.indexOf('/') === 0 ? str.substring(1) : str;

const isMac = () => window.navigator.appVersion.includes('Mac');

// Element handles
var _elements = {};
var setElement = (name, selector) =>
  (_elements[name] = document.querySelector(selector));

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

// Loading
var loading = {
  isLoading: () => elements.body.hasAttribute('loading'),
  start: () =>
    !loading.isLoading() && elements.body.setAttribute('loading', ''),
  stop: () => loading.isLoading() && elements.body.removeAttribute('loading'),
};

var fadeContentNode = {
  isLoading: () => elements.body.hasAttribute('fade'),
  start: () =>
    !fadeContentNode.isLoading() && elements.body.setAttribute('fade', ''),
  stop: () =>
    fadeContentNode.isLoading() && elements.body.removeAttribute('fade'),
};

// Route
const getPath = () => window.location.pathname;

const updatePath = path => {
  const currentPath = getPath();
  if (currentPath === path) {
    return;
  }
  history.pushState('', path, path);
};

// Fetch
async function getHtmlFromUrl(url) {
  const response = await fetch(url);
  if (response.status >= 400 && response.status < 600) {
    throw new Error('File not found');
  }
  return await response.text();
}

// ContentNode
const addChildNode = (parent, child) => parent.appendChild(child);

const removeChildNodes = parent => {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
};

const createNodesFromHtml = html => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
};

const createUrlFromPath = path => {
  let newPath = stripLeadingSlash(path);
  if (newPath === '') {
    newPath = 'index';
  }
  return `${config.content.folder}/${newPath}.html`;
};

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

const setNavActivePath = () => {
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

// Hooks
window.onload = () => {
  Promise.all([goToRoutePath(getPath()), loadNav()]).then(() => {
    loading.stop();
    setNavActivePath();
  });
};

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
    goToRoutePath(path).then(() => {
      setNavActivePath();
    });
  }
};

window.onpopstate = event => {
  event.preventDefault();
  goToRoutePath(getPath()).then(() => {
    setNavActivePath();
  });
};
