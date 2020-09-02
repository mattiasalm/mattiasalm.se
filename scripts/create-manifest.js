const fs = require('fs');
const { iconName, createDir, config, resolvePublicPath } = require('./_utils');

module.exports = () => {

  const manifest = {
    name: config.name,
    short_name: config.name,
    icons: config.iconSizes.map(size => ({
      src: iconName(size),
      sizes: `${size}x${size}`,
      type: 'image/png',
      ...(size === 192 && { purpose: 'any maskable' }),
    })),
    start_url: config.startUrl,
    display: config.display,
    background_color: config.backgroundColor,
    theme_color: config.themeColor,
  };

  const path = resolvePublicPath('manifest.json');
  createDir(resolvePublicPath())
  fs.writeFileSync(path, JSON.stringify(manifest, null, '\t'));
};