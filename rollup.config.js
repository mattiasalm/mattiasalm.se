import { terser } from 'rollup-plugin-terser';
import rollupPostcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import postcssVariables from 'postcss-css-variables';
import clean from 'postcss-clean';
import copy from 'rollup-plugin-copy';

const htmlContentTransform = require('./scripts/html-content-transform');
const { developmentMode, outputFileName } = require('./scripts/_utils');

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
          transform: htmlContentTransform,
        },
        {
          src: 'src/index.html',
          dest: 'public',
          transform: htmlContentTransform,
        },
        {
          src: 'src/images/**/*',
          dest: 'public/images',
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
