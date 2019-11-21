# lazy


## Dependencies

Install [superstatic](https://github.com/firebase/superstatic), [onchange](https://github.com/Qard/onchange), [terser](https://github.com/terser/terser) and [now](https://github.com/zeit/now) with `npm i -g superstatic onchange terser now postcss-cli autoprefixer cssnano postcss-css-variables postcss-syntax postcss postcss-html`.

## Serving

To serve the from the `src` folder with onchange watching for the files run `zsh serve.sh`.

## Building

To only build from `src` folder run `zsh build.sh`.

## Deploying

Deploy to Zeit production by running `zsh build.sh && zsh deploy.sh`.