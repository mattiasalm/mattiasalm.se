export interface ConfigContent {
  fileNotFoundPath: string;
  folder: string;
  loadingClassName: string | null;
  loadingClassDelay: number;
  navContentPath: string;
  slashFallbackPath: string;
}

export interface ConfigLinks {
  activeClass: string;
}

export interface Config {
  content: ConfigContent;
  links: ConfigLinks;
}

const config: Config = {
  content: {
    fileNotFoundPath: '/404',
    folder: 'content',
    loadingClassName: 'fade',
    loadingClassDelay: 320,
    navContentPath: '/nav',
    slashFallbackPath: '/index', // the path to use as fallback for links with path '/'
  },
  links: {
    activeClass: 'active-link',
  },
};

export default config;
