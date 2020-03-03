const currentPath = () => window.location.pathname;

const setNewPath = (newPath: string) =>
  currentPath() === newPath
    ? undefined
    : history.pushState('', newPath, newPath);

export default {
  currentPath,
  setNewPath,
};
