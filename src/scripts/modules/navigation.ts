import { elementReference } from './elements';
import { setActiveLinks } from './utils';

const currentPath = () => window.location.pathname;

const setNewPath = (newPath: string) =>
  currentPath() === newPath
    ? undefined
    : history.pushState('', newPath, newPath);

const closeNavigation = () => {
  if (!!elementReference.navigation) {
    const inputElem = elementReference.navigation.querySelector('input');
    if (!!inputElem && inputElem.checked) {
      inputElem.checked = false;
    }
  }
};

const setActiveLinksInNavigation = () => {
  if (!!elementReference.navigation) {
    setActiveLinks(elementReference.navigation, currentPath());
  }
};

export {
  currentPath,
  setNewPath,
  closeNavigation,
  setActiveLinksInNavigation,
};
