import { terser } from 'rollup-plugin-terser';
import rollupPostcss from 'rollup-plugin-postcss';
import postcss from 'postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import postcssVariables from 'postcss-css-variables';
import clean from 'postcss-clean';
import CleanCSS from 'clean-css';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';
import { minify } from 'html-minifier-terser';

const developmentMode = process.env.NODE_ENV === 'development';

const copyTransform = contents => {
  if (developmentMode) {
    return contents.toString();
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

  return minify(contents.toString(), htmlMinifyOptions);
};

export default {
  input: './src/main.ts',
  output: {
    file: './public/main.min.js',
    format: 'iife',
  },
  plugins: [
    copy({
      targets: [
        {
          src: 'src/content/**/*',
          dest: 'public/content',
          transform: copyTransform,
        },
        { src: 'src/index.html', dest: 'public', transform: copyTransform },
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
    typescript({
      abortOnError: false,
      clean: true,
    }),
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
