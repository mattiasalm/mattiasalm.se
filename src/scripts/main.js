import hooks from "./modules/hooks";

window.onload = hooks.onLoad;
window.onclick = hooks.onclick;
window.onpopstate = hooks.onpopstate;
window.onkeyup = hooks.onkeyup;
