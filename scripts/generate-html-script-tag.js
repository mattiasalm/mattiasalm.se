const { outputFileName } = require('./_utils');

module.exports = () => `<script async src="${outputFileName}.js"></script></body>`;
