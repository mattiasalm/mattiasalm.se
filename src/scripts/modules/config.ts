export interface Config {
  fileNotFoundPath: string;
  contentDirectory: string;
  navContentPath: string;
  slashFallbackPath: string;
  activeLinkClass: string;
  keyboardNavigationClassName: string;
  pageLoadClassName: string;
  pageLoadDuration: number;
  splashLoadClassName: string;
  splashLoadDuration: number;
  bodySelector: string;
  contentSelector: string;
  navSelector: string;
}

const defaultConfig: Config = {
  keyboardNavigationClassName: 'keyboard-nav',
  fileNotFoundPath: '/404',
  contentDirectory: 'content',
  navContentPath: '/nav',
  slashFallbackPath: '/index', // the path to use as fallback for links with path '/'
  pageLoadClassName: 'fade',
  pageLoadDuration: 320,
  splashLoadClassName: 'splash-loading',
  splashLoadDuration: 4000,
  activeLinkClass: 'active-link',
  bodySelector: 'body',
  contentSelector: '#content',
  navSelector: '#nav',
};

let config: Config = {
  ...defaultConfig,
};

export const setConfig = (newConfig: Partial<Config>): Config =>
  (config = Object.assign(config, newConfig));

export default config;
