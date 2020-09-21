import './styles/index.css';

import { init, bodyElementClass } from '@tinyspa/core';

init({
  navigationPageLoadDelay: 240,
  callbackOnLoad: () => {
    setTimeout(() => bodyElementClass.add('loaded'), 200);
  },
});
