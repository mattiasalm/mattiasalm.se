

const currentPath = () => window.location.pathname;

const setNewPath = newPath => currentPath() === newPath
  ? undefined
  : history.pushState('', newPath, newPath);

export default {
  currentPath,
  setNewPath,
};
