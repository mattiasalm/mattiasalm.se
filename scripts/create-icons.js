const { createCanvas } = require('canvas');
const fs = require('fs');
const { iconName, createDir, config, resolvePublicPath } = require('./_utils');

const createIcon = size => {
  const canvas = createCanvas(size, size);
  const context = canvas.getContext('2d');
  context.fillStyle = config.backgroundColor;
  context.fillRect(0, 0, size, size)

  const text = config.name.substr(0, 1).toUpperCase();
  context.font = `${size * 0.85}px ${config.iconTextFont}`;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillStyle = config.iconTextColor;
  context.fillText(text, size / 2, size / 2);

  return canvas.toBuffer();
}

module.exports = () => {
  const path = resolvePublicPath(config.iconPath);
  createDir(path);
  config.iconSizes.forEach(size => {
    fs.writeFileSync(resolvePublicPath(iconName(size)), createIcon(size));
  })
  fs.writeFileSync(resolvePublicPath(`${config.iconPath}/favicon.png`), createIcon(72));
}
