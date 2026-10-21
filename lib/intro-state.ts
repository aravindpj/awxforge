export const INTRO_KEY = "awx-intro";
export const HEADER_KEY = "awx-header-seen";

export const introBootScript = `(function(){try{var skip=new URLSearchParams(location.search).has("nointro")||navigator.webdriver;var seen=false;try{seen=sessionStorage.getItem("${INTRO_KEY}")==="1"}catch(e){}if(skip||seen){document.documentElement.dataset.intro="done";return}document.documentElement.dataset.intro="play";try{sessionStorage.setItem("${INTRO_KEY}","1")}catch(e){}var style=document.createElement("style");style.id="awx-intro-boot";style.textContent="html{overflow:hidden}#preloader{display:flex!important}";document.head.appendChild(style)}catch(e){document.documentElement.dataset.intro="done"}})();`;

let headerChoice: "once" | "none" | null = null;

export function resolveHeaderAnimate(): "once" | "none" {
  if (headerChoice) return headerChoice;
  if (document.documentElement.dataset.awxHandoff === "1") {
    headerChoice = "none";
    try {
      sessionStorage.setItem(HEADER_KEY, "1");
    } catch {
      /* Storage can be blocked. The in-memory choice still holds for this load. */
    }
    return headerChoice;
  }
  try {
    if (sessionStorage.getItem(HEADER_KEY) === "1") headerChoice = "none";
    else {
      headerChoice = "once";
      sessionStorage.setItem(HEADER_KEY, "1");
    }
  } catch {
    headerChoice = "once";
  }
  return headerChoice;
}
