import config from "./config";

//
// Remove leading slash in string
const stripLeadingSlash = str => str.replace(/^\/+/i, '');

export default {
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  //
  // Check if url is considered to be a relative path
  isRelativeUrl: url => url.indexOf('://') < 1 && url.indexOf('//') !== 0,

  //
  // Check if is running on a Mac
  isMac: () => window.navigator.appVersion.includes('Mac'),

  //
  // Create full URL from path and append content folder and extension
  createUrlFromPath: path => {
    let newPath = stripLeadingSlash(path);
    if (newPath === '') {
      newPath = 'index';
    }
    return `${config.content.folder}/${newPath}.html`;
  },

  stripLeadingSlash
};
