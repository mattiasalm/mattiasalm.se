export interface ConfigContent {
  fileNotFoundPath: string;
  folder: string;
  navContentPath: string;
  slashFallbackPath: string;
}

export interface ConfigLinks {
  activeClass: string;
}

export interface ConfigSelectors {
  body: string;
  content: string;
  nav: string;
}

export interface ConfigLoading {
  pageLoadClassName: string;
  pageLoadDuration: number;
  splashLoadClassName: string;
  splashLoadDuration: number;
}

export interface ConfigGeneral {
  keyboardNavigationClassName: string;
}

export interface Config {
  general: ConfigGeneral;
  content: ConfigContent;
  links: ConfigLinks;
  selectors: ConfigSelectors;
  loading: ConfigLoading;
}

const config: Config = {
  general: {
    keyboardNavigationClassName: 'keyboard-nav',
  },
  content: {
    fileNotFoundPath: '/404',
    folder: 'content',
    navContentPath: '/nav',
    slashFallbackPath: '/index', // the path to use as fallback for links with path '/'
  },
  loading: {
    pageLoadClassName: 'fade',
    pageLoadDuration: 320,
    splashLoadClassName: 'splash-loading',
    splashLoadDuration: 4000,
  },
  links: {
    activeClass: 'active-link',
  },
  selectors: {
    body: 'body',
    content: '#content',
    nav: '#nav',
  }
};

export default config;
