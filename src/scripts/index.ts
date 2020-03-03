import hooks from './modules/hooks';

window.onload = hooks.onLoad;
window.onclick = hooks.onClick;
window.onpopstate = hooks.onPopState;
window.onkeyup = hooks.onKeyUp;
