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
declare const config: Config;
export default config;
