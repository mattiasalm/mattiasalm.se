const fs = require('fs');
const postcss = require('postcss');
const CleanCSS = require('clean-css');
const { minify } = require('html-minifier-terser');
const autoprefixer = require('autoprefixer');
const postcssVariables = require('postcss-css-variables');

const { developmentMode, resolveSrcPath } = require('./_utils');
const generateHtmlHead = require('./generate-html-head');
const generateHtmlScriptTag = require('./generate-html-script-tag');

const postCssProcessOptions = {
  from: undefined,
  map: false,
};

const htmlMinifyOptions = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  minifyCSS: text => {
    const processed = postcss([autoprefixer, postcssVariables]).process(
      text,
      postCssProcessOptions,
    ).css;
    return new CleanCSS().minify(processed).styles;
  },
};

module.exports = htmlBuffer => {
  let htmlContent = htmlBuffer.toString();

  htmlContent = htmlContent.replace('<head>', generateHtmlHead());
  htmlContent = htmlContent.replace('</body>', generateHtmlScriptTag());

  const includeFiles = htmlContent.match(/(?<=##__INCLUDE:).+(?=__##)/gm);
  if (!!includeFiles && includeFiles.length > 0) {
    includeFiles.forEach(fileName => {
      const fileContent = fs.readFileSync(resolveSrcPath(fileName), 'utf8');
      const replaceRegEx = new RegExp(
        `##__INCLUDE:${fileName
          .replace('/', '\\/')
          .replace('.', '\\.')}__##`,
      );
      htmlContent = htmlContent.replace(replaceRegEx, fileContent);
    });
  }

  if (developmentMode) {
    return htmlContent;
  }

  return minify(htmlContent, htmlMinifyOptions);
};