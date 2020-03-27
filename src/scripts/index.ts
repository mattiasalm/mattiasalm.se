import { onLoad, onClick, onPopState, onKeyUp } from './modules/hooks';

export { setConfig, Config } from './modules/config';

window.onload = onLoad;
window.onclick = onClick;
window.onpopstate = onPopState;
window.onkeyup = onKeyUp;
