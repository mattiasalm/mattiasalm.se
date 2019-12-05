import utils from './utils';

export default {
  //
  // Add class 'active-link' on all links that match current path
  // and remove class on the others
  setActiveLinks: (links, currentPath) => {
    // Set active
    links
      .filter(
        link =>
          utils.stripLeadingSlash(link.getAttribute('href')) ===
          utils.stripLeadingSlash(currentPath)
      )
      .forEach(link => {
        link.classList.add('active-link');
      });

    // Set inactive
    links
      .filter(
        link =>
          utils.stripLeadingSlash(link.getAttribute('href')) !==
          utils.stripLeadingSlash(currentPath)
      )
      .forEach(link => {
        link.classList.remove('active-link');
      });
  },
};
