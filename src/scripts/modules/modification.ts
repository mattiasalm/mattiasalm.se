import utils from './utils';
import config from './config';

//
// Add class on all links that match current path
// and remove class on the others
const setActiveLinks = (links: HTMLAnchorElement[], currentPath: string) => {
  // Set active
  links
    .filter(
      link =>
        !!link.getAttribute('href') &&
        utils.stripLeadingSlash(link.getAttribute('href') || '') ===
          utils.stripLeadingSlash(currentPath),
    )
    .forEach(link => {
      link.classList.add(config.links.activeClass);
    });

  // Set inactive
  links
    .filter(
      link =>
        !!link.getAttribute('href') &&
        utils.stripLeadingSlash(link.getAttribute('href') || '') !==
          utils.stripLeadingSlash(currentPath),
    )
    .forEach(link => {
      link.classList.remove(config.links.activeClass);
    });
};

export default {
  setActiveLinks,
};
