import config from './config';

interface ElementReferences {
  [key: string]: Element;
}

const _elements: ElementReferences = {};
const _setElement = (name: string, selector: string): Element | null => {
  const elementRef = document.querySelector(selector);
  return !!elementRef ? (_elements[name] = elementRef) : null;
};

export interface GetElementReference {
  bodyElem: Element | null;
  navElem: Element | null;
  contentElem: Element | null;
}

const getElementReference: GetElementReference = {
  get bodyElem() {
    return _elements.bodyElem || _setElement('bodyElem', config.bodySelector);
  },

  get navElem() {
    return _elements.navElem || _setElement('navElem', config.navSelector);
  },

  get contentElem() {
    return _elements.contentElem || _setElement('contentElem', config.contentSelector);
  },
};

export default getElementReference;
