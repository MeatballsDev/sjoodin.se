(() => {
  const root = document.documentElement;

  // Dark mode toggle, remembered per browser
  const prefersDark = matchMedia("(prefers-color-scheme: dark)");
  document.getElementById("theme").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : prefersDark.matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // Language switch. English is the page's own text, Swedish comes from lang-sv.js.
  // A saved choice wins; otherwise Swedish browsers get Swedish.
  const sv = window.SV || {};
  const texts = [...document.querySelectorAll("[data-i18n]")].map((el) => [el, el.innerHTML]);
  const attrs = [
    ...[...document.querySelectorAll("[data-i18n-aria]")].map((el) => [el, "aria-label", el.dataset.i18nAria]),
    ...[...document.querySelectorAll("[data-i18n-content]")].map((el) => [el, "content", el.dataset.i18nContent]),
    ...[...document.querySelectorAll("[data-i18n-href]")].map((el) => [el, "href", el.dataset.i18nHref]),
  ].map(([el, attr, key]) => [el, attr, key, el.getAttribute(attr)]);
  const langBtn = document.getElementById("lang");
  const setLang = (lang) => {
    const t = (key, en) => (lang === "sv" && key in sv ? sv[key] : en);
    root.lang = lang;
    texts.forEach(([el, en]) => { el.innerHTML = t(el.dataset.i18n, en); });
    attrs.forEach(([el, attr, key, en]) => el.setAttribute(attr, t(key, en)));
    const other = lang === "sv" ? "en" : "sv";
    langBtn.textContent = other.toUpperCase();
    langBtn.lang = other;
    langBtn.setAttribute("aria-label", other === "sv" ? "Byt till svenska" : "Switch to English");
  };
  let lang = null;
  try { lang = localStorage.getItem("lang"); } catch (e) {}
  if (lang !== "sv" && lang !== "en") lang = (navigator.languages || [navigator.language]).some((l) => /^sv\b/i.test(l)) ? "sv" : "en";
  setLang(lang);
  langBtn.addEventListener("click", () => {
    lang = lang === "sv" ? "en" : "sv";
    setLang(lang);
    try { localStorage.setItem("lang", lang); } catch (e) {}
  });

  // Mark the nav link for the section currently in view
  const links = new Map([...document.querySelectorAll(".nav-links a")].map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.removeAttribute("aria-current"));
      links.get(e.target.id)?.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  links.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

})();
