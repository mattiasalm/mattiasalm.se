import { terser } from 'rollup-plugin-terser';
import rollupPostcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import postcssVariables from 'postcss-css-variables';
import clean from 'postcss-clean';
import CleanCSS from 'clean-css';
import copy from 'rollup-plugin-copy';
import { minify } from 'html-minifier-terser';
import * as fs from 'fs';
const sharp = require('sharp');

const developmentMode = process.env.NODE_ENV === 'development';
const outputFileName = developmentMode ? 'main' : 'main.min';

const copyTransform = contents => {
  let htmlContent = contents.toString();

  htmlContent = htmlContent.replace(
    '##__CSS__##',
    `${outputFileName}.css`,
  );
  htmlContent = htmlContent.replace('##__JS__##', `${outputFileName}.js`);

  const includeFiles = htmlContent.match(/(?<=##__INCLUDE:).+(?=__##)/gm);
  if (!!includeFiles && includeFiles.length > 0) {
    includeFiles.forEach(fileName => {
      const fileContent = fs.readFileSync(`src/${fileName}`, 'utf8');
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

  const processOptions = {
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
        processOptions,
      ).css;
      return new CleanCSS().minify(processed).styles;
    },
  };

  return minify(htmlContent, htmlMinifyOptions);
};

const iconTransform = icon => {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  const dir = './public/images/icons';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  sizes.map(size => sharp(icon).resize(size, size).toFile(`${dir}/icon-${size}x${size}.png`));
  sharp(icon).resize(72,72).toFile(`${dir}/favicon.png`)
  return icon;
};

export default {
  input: './src/main.ts',
  output: {
    file: `./public/${outputFileName}.js`,
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    copy({
      targets: [
        {
          src: 'src/content/**/*',
          dest: 'public/content',
          transform: copyTransform,
        },
        {
          src: 'src/index.html',
          dest: 'public',
          transform: copyTransform,
        },
        {
          src: 'src/manifest.json',
          dest: 'public',
        },
        {
          src: 'src/service-worker.js',
          dest: 'public',
        },
        {
          src: 'src/robots.txt',
          dest: 'public',
        },
        {
          src: 'src/icon.png',
          dest: 'public/images/icons',
          transform: iconTransform,
        },
      ],
    }),
    rollupPostcss({
      extract: true,
      plugins: [
        atImport(),
        autoprefixer(),
        !developmentMode && postcssVariables(),
        !developmentMode && clean(),
      ],
    }),
    typescript(),
    !developmentMode &&
    terser({
      compress: {
        module: true,
      },
      mangle: {
        properties: {
          keep_quoted: true,
        },
      },
    }),
  ],
};
