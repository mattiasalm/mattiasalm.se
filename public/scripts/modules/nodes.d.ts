declare const _default: {
    removeChildren: (parent: Element) => void;
    addChild: (parent: Element, child: ChildNode) => ChildNode;
    createNodesFromHtml: (html: string) => NodeListOf<ChildNode>;
    replaceNodesFromHtml: (parent: Element, html: string) => void;
};
export default _default;
