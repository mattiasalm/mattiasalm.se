//
// Remove all child nodes in parent element
const removeChildren = (parent: Element) => {
  while (parent && parent.firstChild) {
    parent.firstChild.remove();
  }
};

//
// Add child node to parent element
const addChild = (parent: Element, child: ChildNode) =>
  parent.appendChild(child);

//
// Create element nodes from HTML text string
const createNodesFromHtml = (html: string) => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
};

const replaceNodesFromHtml = (parent: Element, html: string) => {
  // console.log(elements.contentElem.childNodes)
  // const config = { attributes: true, childList: true, subtree: true };
  // const observer = new MutationObserver((mutationList, observer) => {
  //   console.log(elements.contentElem.childNodes)
  //   console.log(Array.from(mutationList));
  // })
  // observer.observe(elements.contentElem, config);
  removeChildren(parent);
  createNodesFromHtml(html).forEach(child => addChild(parent, child));
};

export default {
  removeChildren,
  addChild,
  createNodesFromHtml,
  replaceNodesFromHtml,
};
