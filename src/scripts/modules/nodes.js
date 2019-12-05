//
// Remove all child nodes in parent element
const removeChildren = parent => {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
};

//
// Add child node to parent element
const addChild = (parent, child) => parent.appendChild(child);

//
// Create element nodes from HTML text string
const createNodesFromHtml = html => {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
};

export default {
  removeChildren,
  addChild,
  createNodesFromHtml,

  replaceNodesFromHtml: (parent, html) => {
    // console.log(elements.contentNode.childNodes)
    // const config = { attributes: true, childList: true, subtree: true };
    // const observer = new MutationObserver((mutationList, observer) => {
    //   console.log(elements.contentNode.childNodes)
    //   console.log(Array.from(mutationList));
    // })
    // observer.observe(elements.contentNode, config);
    removeChildren(parent);
    createNodesFromHtml(html)
      .forEach(child => addChild(parent, child));
  },
};
