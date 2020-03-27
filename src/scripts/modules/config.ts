export interface Config {
  classNameActiveLinkInNavigation: string;
  classNameKeyboardNavigationActive: string;
  classNamePageTransition: string;
  classNameRemovalDelayPageTransition: number;
  classNameRemovalDelaySplashLoading: number;
  classNameSplashLoading: string;
  directoryContent: string;
  domSelectorBody: string;
  domSelectorContent: string;
  domSelectorNavigation: string;
  pathFileNotFound: string;
  pathToIndexContent: string;
  pathToNavigationContent: string;
  loadIndexContentOnLoad: boolean;
}

const defaultConfig: Config = {
  classNameActiveLinkInNavigation: 'active-link',
  classNameKeyboardNavigationActive: 'keyboard-nav',
  classNamePageTransition: '',
  classNameRemovalDelayPageTransition: 0,
  classNameRemovalDelaySplashLoading: 0,
  classNameSplashLoading: '',
  directoryContent: 'content',
  domSelectorBody: 'body',
  domSelectorContent: '#content',
  domSelectorNavigation: '#nav',
  pathFileNotFound: '/404',
  pathToIndexContent: '/index', // the content to use for path '/'
  pathToNavigationContent: '', // empty to not load anything dynamically
  loadIndexContentOnLoad: false,
};

export let config: Config = {
  ...defaultConfig,
};

export const setConfig = (newConfig: Partial<Config>): Config =>
  (config = Object.assign(config, newConfig));
