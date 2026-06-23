const storageKey = "theme";
const root = document.documentElement;
const button = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

function preferredTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-next-theme-label", theme === "dark" ? "Light" : "Dark");

  if (!button) {
    return;
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  button.setAttribute("aria-pressed", String(theme === "dark"));
  button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);

  const label = button.querySelector(".theme-toggle-label");
  if (label) {
    label.textContent = "";
  }
}

function storedTheme() {
  try {
    return localStorage.getItem(storageKey);
  } catch (error) {
    return null;
  }
}

function persistTheme(theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch (error) {
    // Ignore storage access failures and keep the active session theme only.
  }
}

const initialTheme = storedTheme() || root.getAttribute("data-theme") || preferredTheme();
applyTheme(initialTheme);

if (button) {
  button.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme") || preferredTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  });
}

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", () => {
  if (!storedTheme()) {
    applyTheme(preferredTheme());
  }
});

function closeMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("title", "Open menu");
  root.removeAttribute("data-menu-open");
}

function openMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("title", "Close menu");
  root.setAttribute("data-menu-open", "true");
}

function syncMenuForViewport() {
  if (window.innerWidth > 700) {
    closeMenu();
  }
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 700) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", syncMenuForViewport);
  syncMenuForViewport();
}
