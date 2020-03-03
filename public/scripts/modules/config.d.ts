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
declare const config: Config;
export default config;
