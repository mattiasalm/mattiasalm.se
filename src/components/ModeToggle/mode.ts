/** Visual mode of the site: the CRT look, or a plain text file. */
export type Mode = "fancy" | "boring";

/** Query param that carries the mode between pages. */
const modeParam = "mode";

/** Browser chrome colour per mode, matching the page background. */
const themeColors: Readonly<Record<Mode, string>> = {
  fancy: "#040e06",
  boring: "#ffffff",
};

/**
 * Reads the current mode from the page URL.
 *
 * @returns `"boring"` when `?mode=boring` is set, otherwise `"fancy"`.
 */
export const readModeFromUrl = (): Mode =>
  new URLSearchParams(window.location.search).get(modeParam) === "boring" ? "boring" : "fancy";

/**
 * Returns `href` with the mode param set for boring mode, or removed for fancy mode.
 *
 * @param href - A same-origin URL or path.
 * @param mode - The mode to encode.
 * @returns The rewritten URL, relative to the origin.
 * @example withMode("/cv", "boring") // "/cv?mode=boring"
 */
const withMode = (href: string, mode: Mode): string => {
  const url = new URL(href, window.location.origin);

  switch (mode) {
    case "boring":
      url.searchParams.set(modeParam, "boring");
      break;
    case "fancy":
      url.searchParams.delete(modeParam);
      break;
  }

  return `${url.pathname}${url.search}${url.hash}`;
};

/**
 * Replaces the current history entry so the URL reflects `mode`, without a reload.
 *
 * @param mode - The mode to write.
 */
export const writeModeToUrl = (mode: Mode): void =>
  window.history.replaceState(null, "", withMode(window.location.href, mode));

/**
 * Applies `mode` to the document: the `data-mode` attribute that drives the styles,
 * the toggle buttons' pressed state, the theme colour, and internal links so the
 * mode survives navigation.
 *
 * @param mode - The mode to apply.
 */
export const applyMode = (mode: Mode): void => {
  const root = document.documentElement;
  const isBoring = mode === "boring";

  if (isBoring) {
    root.dataset.mode = "boring";
  } else {
    delete root.dataset.mode;
  }

  document
    .querySelectorAll("[data-mode-toggle]")
    .forEach((button) => button.setAttribute("aria-pressed", String(isBoring)));

  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[mode]);

  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="/"]')
    .forEach((link) => link.setAttribute("href", withMode(link.getAttribute("href") ?? "/", mode)));
};
