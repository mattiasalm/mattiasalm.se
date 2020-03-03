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
declare let config: Config;
export declare const setConfig: (newConfig: Partial<Config>) => Config;
export default config;
