const _elements = {};
const _setElement = (name, selector) =>
  (_elements[name] = document.querySelector(selector));

export default {
  get bodyElem() {
    return _elements.bodyElem || _setElement('bodyElem', 'body');
  },

  get navElem() {
    return _elements.navElem || _setElement('navElem', '#nav');
  },

  get contentElem() {
    return _elements.contentElem || _setElement('contentElem', '#content');
  },
};
