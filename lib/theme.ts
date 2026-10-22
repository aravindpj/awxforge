export const THEME_KEY = "awx-theme";
export const THEME_EVENT = "awx:theme";

export type Theme = "light" | "dark";

export const themeBootScript = `(function(){try{var stored=localStorage.getItem("${THEME_KEY}");var theme=stored==="light"||stored==="dark"?stored:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var root=document.documentElement;root.dataset.theme=theme;root.style.colorScheme=theme}catch(e){}})();`;

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const color = theme === "dark" ? "#0a0a0a" : "#ffffff";
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", color);
  });
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function bindSystemTheme() {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      return;
    }
    if (stored === "light" || stored === "dark") return;
    applyTheme(media.matches ? "dark" : "light");
  };
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

let pair: { theme: string; dim: string; ink: string } = {
  theme: "",
  dim: "#D4D4D4",
  ink: "#0A0A0A",
};

export function themePairSnapshot() {
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  if (pair.theme === theme) return pair;
  const style = getComputedStyle(document.documentElement);
  pair = {
    theme,
    dim: style.getPropertyValue("--dim").trim() || pair.dim,
    ink: style.getPropertyValue("--ink").trim() || pair.ink,
  };
  return pair;
}
