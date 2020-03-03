//
// Remove all child nodes in parent element
const removeChildren = (parent: Element) => {
  while (parent instanceof Element && parent.firstChild) {
    parent.firstChild.remove();
  }
};

//
// Add child node to parent element
const addChild = (parent: Element, child: ChildNode) => {
  if (parent instanceof Element && !!child) {
    parent.appendChild(child);
  }
};

//
// Create element nodes from HTML text string
const createNodesFromHtmlString = (html: string) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return [...Array.from(template.content.childNodes)];
};

const replaceNodesFromHtmlString = (parent: Element, htmlString: string) => {
  removeChildren(parent);
  createNodesFromHtmlString(htmlString).forEach(child =>
    addChild(parent, child),
  );
};

export default {
  removeChildren,
  addChild,
  createNodesFromHtmlString,
  replaceNodesFromHtmlString,
};
