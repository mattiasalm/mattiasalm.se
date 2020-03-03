import elements from './elements';
import utils from './utils';

const currentPath = () => window.location.pathname;

const setNewPath = (newPath: string) =>
  currentPath() === newPath
    ? undefined
    : history.pushState('', newPath, newPath);

const closeMenu = () => {
  if (!!elements.navElem) {
    const inputElem = elements.navElem.querySelector('input');
    if (!!inputElem && inputElem.checked) {
      inputElem.checked = false;
    }
  }
};

const updateActiveLinksInMenu = () => {
  if (!!elements.navElem) {
    utils.setActiveLinks(elements.navElem, currentPath());
  }
};

export default {
  currentPath,
  setNewPath,
  closeMenu,
  updateActiveLinksInMenu,
};
