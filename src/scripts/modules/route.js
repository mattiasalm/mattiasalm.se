

export default {
  get path() {
    return window.location.pathname;
  },

  set path(newPath) {
    if (window.location.pathname === newPath) {
      return;
    }
    history.pushState('', newPath, newPath);
  },
};
