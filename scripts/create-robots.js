const fs = require('fs');
const { createDir, resolvePublicPath } = require('./_utils');

module.exports = () => {
  const path = resolvePublicPath('robots.txt');
  createDir(resolvePublicPath());
  fs.writeFileSync(path, 'User-agent: *\nAllow: /');
};
