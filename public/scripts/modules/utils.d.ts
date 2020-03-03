declare const _default: {
    stripLeadingSlash: (str: string) => string;
    wait: (ms: number) => Promise<unknown>;
    isRelativeUrl: (url: string) => boolean;
    isMac: () => boolean;
    createContentUrlFromPath: (path: string) => string;
    setActiveLinks: (parent: Element, currentPath: string) => void;
    hideSplashLoading: (loadingTime: number) => void;
    getHtmlFromUrl: (url: string) => Promise<string>;
};
export default _default;
