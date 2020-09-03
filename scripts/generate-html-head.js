const { config, outputFileName } = require('./_utils');

module.exports = () => `
  <head>
    <title>${config.name}</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="Description" content="${config.description}" />
    <meta name="theme-color" content="${config.themeColor}" />
    <link rel="icon" type="image/png" href="${config.iconPath}/favicon.png" />
    <link rel="apple-touch-icon" href="${config.iconPath}/icon-192x192.png" />
    <link rel="preconnect" href="https://storage.googleapis.com" />
    <link rel="manifest" href="manifest.json" />
    <link rel="stylesheet" href="${outputFileName}.css" />
`;
