declare const _default: {
    stripLeadingSlash: (str: string) => string;
    wait: (ms: number) => Promise<unknown>;
    isRelativeUrl: (url: string) => boolean;
    isMac: () => boolean;
    createContentUrlFromPath: (path: string) => string;
};
export default _default;
