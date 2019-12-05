const _elements = {};
const _setElement = (name, selector) =>
  (_elements[name] = document.querySelector(selector));

export default {
  get body() {
    return _elements.body || _setElement('body', 'body');
  },

  get nav() {
    return _elements.nav || _setElement('nav', '#nav');
  },

  get contentNode() {
    return _elements.contentNode || _setElement('contentNode', '#content');
  },
};
