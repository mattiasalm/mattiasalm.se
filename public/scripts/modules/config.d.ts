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
export declare let config: Config;
export declare const setConfig: (newConfig: Partial<Config>) => Config;
