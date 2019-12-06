import config from "./config";

//
// Remove leading slash in string
const stripLeadingSlash = str => str.replace(/^\/+/i, '');

const wait = async ms => new Promise(resolve => setTimeout(resolve, ms));

//
// Check if url is considered to be a relative path
const isRelativeUrl = url => url.indexOf('://') < 1 && url.indexOf('//') !== 0;

//
// Check if is running on a Mac
const isMac = () => window.navigator.appVersion.includes('Mac');

//
// Create full URL from path and append content folder and extension
const createContentUrlFromPath = path => {
  let newPath = stripLeadingSlash(path);
  if (newPath === '') {
    newPath = config.content.slashFallbackPath;
  }
  return `${config.content.folder}/${newPath}.html`;
};

export default {
  stripLeadingSlash,
  wait,
  isRelativeUrl,
  isMac,
  createContentUrlFromPath,
};
