//
// Remove all child nodes in parent element
export const removeChildNodes = (parent: Element) => {
  while (parent instanceof Element && parent.firstChild) {
    parent.firstChild.remove();
  }
};

//
// Add child node to parent element
export const addChildNode = (parent: Element, child: ChildNode) => {
  if (parent instanceof Element && !!child) {
    parent.appendChild(child);
  }
};

//
// Create element nodes from HTML text string
export const createNodesFromHtmlString = (html: string) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return [...Array.from(template.content.childNodes)];
};

export const replaceNodesFromHtmlString = (
  parent: Element,
  htmlString: string,
) => {
  removeChildNodes(parent);
  createNodesFromHtmlString(htmlString).forEach(child =>
    addChildNode(parent, child),
  );
};
