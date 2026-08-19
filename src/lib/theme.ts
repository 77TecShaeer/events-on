export const THEME_KEY = "events-on-theme";

export const themeBootScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var d=document.documentElement;if(t==="light"){d.classList.remove("dark");d.removeAttribute("data-theme")}else{d.classList.add("dark");d.setAttribute("data-theme","dark")}}catch(e){document.documentElement.classList.add("dark")}})();`;

export type Theme = "light" | "dark";
