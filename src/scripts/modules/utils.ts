import config from './config';
import elements from './elements';

//
// Remove leading slash in string
const stripLeadingSlash = (str: string): string => str.replace(/^\/+/i, '');

const wait = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

//
// Check if url is considered to be a relative path
const isRelativeUrl = (url: string): boolean =>
  url.indexOf('://') < 1 && url.indexOf('//') !== 0;

//
// Check if is running on a Mac
const isMac = (): boolean => window.navigator.appVersion.includes('Mac');

//
// Create full URL from path and append content folder and extension
const createContentUrlFromPath = (path: string): string => {
  let newPath = stripLeadingSlash(path);
  if (newPath === '') {
    newPath = config.content.slashFallbackPath;
  }
  return `${config.content.folder}/${newPath}.html`;
};

//
// Add class on all links that match current path
// and remove class on the others
const setActiveLinks = (parent: Element, currentPath: string) => {
  if (!(parent instanceof Element)) {
    return;
  }

  const linkElements = parent.querySelectorAll('a');
  const links = [...Array.from(linkElements)];

  // Set active
  links
    .filter(
      link =>
        !!link.getAttribute('href') &&
        stripLeadingSlash(link.getAttribute('href') || '') ===
          stripLeadingSlash(currentPath),
    )
    .forEach(link => {
      link.classList.add(config.links.activeClass);
    });

  // Set inactive
  links
    .filter(
      link =>
        !!link.getAttribute('href') &&
        stripLeadingSlash(link.getAttribute('href') || '') !==
          stripLeadingSlash(currentPath),
    )
    .forEach(link => {
      link.classList.remove(config.links.activeClass);
    });
};

const hideSplashLoading = (loadingTime: number) => {
  if (loadingTime > config.loading.splashLoadDuration) {
    if (!!elements.bodyElem) {
      elements.bodyElem.classList.remove(config.loading.splashLoadClassName);
    }
  } else {
    setTimeout(() => {
      if (!!elements.bodyElem) {
        elements.bodyElem.classList.remove(config.loading.splashLoadClassName);
      }
    }, config.loading.splashLoadDuration - loadingTime);
  }
};

//
// Async fetch content from URL and return as text
const getHtmlFromUrl = async (url: string) => {
  const response = await fetch(url);
  if (response.status >= 400 && response.status < 600) {
    throw new Error('File not found');
  }
  return await response.text();
};

export default {
  stripLeadingSlash,
  wait,
  isRelativeUrl,
  isMac,
  createContentUrlFromPath,
  setActiveLinks,
  hideSplashLoading,
  getHtmlFromUrl,
};
