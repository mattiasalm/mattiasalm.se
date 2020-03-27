import { config } from "./config";

interface ElementReferences {
  [key: string]: Element;
}

const _elements: ElementReferences = {};
const _setElement = (name: string, selector: string): Element | null => {
  const elementRef = document.querySelector(selector);
  return !!elementRef ? (_elements[name] = elementRef) : null;
};

export interface ElementReference {
  body: Element | null;
  navigation: Element | null;
  content: Element | null;
}

export const elementReference: ElementReference = {
  get body() {
    return _elements.body || _setElement('body', config.domSelectorBody);
  },

  get navigation() {
    return _elements.navigation || _setElement('navigation', config.domSelectorNavigation);
  },

  get content() {
    return _elements.content || _setElement('content', config.domSelectorContent);
  },
};