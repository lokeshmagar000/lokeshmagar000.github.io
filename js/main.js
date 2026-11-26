/* ==========================================================
   main.js — makes the page work
   1. language switch   2. theme switch   3. menu
   4. builds project cards   5. screenshot viewer
   6. scroll animations   7. contact form   8. starts the 3D
   ========================================================== */

import { SITE, TEXT, PROJECTS } from "./content.js?v=20261126b";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// localStorage can fail (private mode, blocked cookies), so we wrap it.
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

// Escape text before putting it into HTML (keeps the page safe).
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Only allow normal web links (blocks "javascript:" tricks).
const safeUrl = (u) => (typeof u === "string" && /^https?:\/\//i.test(u) ? u : null);

let lang = store.get("lang") === "ne" ? "ne" : "en";
const t = (key) => TEXT[lang][key] ?? TEXT.en[key] ?? "";

/* ---------- 1. LANGUAGE ---------- */
function applyLanguage() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  renderProjects();
}

function switchLanguage(next) {
  if (next === lang) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.body.classList.add("lang-switching");          // fade out
  setTimeout(() => {
    lang = next;
    store.set("lang", lang);
    applyLanguage();
    document.body.classList.remove("lang-switching");     // fade back in
  }, reduce ? 0 : 250);
}
$$(".lang button").forEach((b) => b.addEventListener("click", () => switchLanguage(b.dataset.lang)));

/* ---------- 2. THEME (light / dark) ---------- */
$("#themeBtn").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  store.set("theme", next);
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
});

/* ---------- 3. MENU ---------- */
const menuBtn = $("#menuBtn");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
$$(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); closeLightbox(); } });

// Glass menu bar after scrolling + highlight the section you are in
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 30);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const sectionSpy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section").forEach((s) => sectionSpy.observe(s));

/* ---------- Profile photo + social links ---------- */
if (SITE.photo) {
  const img = new Image();
  img.src = SITE.photo;
  img.alt = TEXT.en.name;
  img.onload = () => { $("#avatar").innerHTML = ""; $("#avatar").append(img); };
}
$("#socialLinks").innerHTML = SITE.social
  .filter((s) => safeUrl(s.url))
  .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`)
  .join("");

/* ---------- 4. PROJECT CARDS ---------- */
function linkButtons(p) {
  return p.links.map((l) => {
    // Namaste Facts style: one platform, Nepali + English channels
    if ("ne" in l || "en" in l) {
      const chip = (code, url) => safeUrl(url)
        ? `<a class="chip" href="${esc(url)}" target="_blank" rel="noopener">${code}</a>`
        : `<span class="chip" title="${esc(t("comingSoon"))}">${code}</span>`;
      return `<div class="p-platform">${esc(l.label)} ${chip("ने", l.ne)} ${chip("EN", l.en)}</div>`;
    }
    // Normal app: one button per platform
    const url = safeUrl(l.url);
    return url
      ? `<a class="p-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`
      : `<span class="p-link soon">${esc(l.label)}<small>· ${esc(t("comingSoon"))}</small></span>`;
  }).join("");
}

function gallery(p) {
  if (p.screenshots.length) {
    return p.screenshots.map((src, i) =>
      `<button type="button" data-full="${esc(src)}" aria-label="${esc(p.name)} screenshot ${i + 1}">
         <img src="${esc(src)}" alt="${esc(p.name)} screenshot ${i + 1}" loading="lazy" decoding="async">
       </button>`).join("");
  }
  // No screenshots yet: show the logo (if any) or a friendly placeholder
  if (p.icon) {
    return `<div class="shot-empty logo"><div><img src="${esc(p.icon)}" alt="${esc(p.name)} logo" loading="lazy">${esc(t("screenshotsSoon"))}</div></div>`;
  }
  return `<div class="shot-empty">${esc(t("screenshotsSoon"))}</div>`;
}

function renderProjects() {
  $("#projectList").innerHTML = PROJECTS.map((p) => `
    <article class="project glass reveal" id="p-${esc(p.id)}" style="--accent:${esc(p.accent)}">
      <div class="p-info">
        <div class="p-head">
          <div class="p-icon">${p.icon ? `<img src="${esc(p.icon)}" alt="" loading="lazy">` : esc(p.name[0])}</div>
          <div>
            <h3>${esc(p.name)}${p.live ? `<span class="badge live">${esc(t("live"))}</span>` : p.comingSoon ? `<span class="badge">${esc(t("comingSoon"))}</span>` : ""}</h3>
            <p class="p-tagline">${esc(p.tagline[lang])}</p>
          </div>
        </div>
        <p class="p-desc">${esc(p.desc[lang])}</p>
        <p class="p-label" style="margin-top:22px">${esc(t("features"))}</p>
        <ul class="p-features">${p.features[lang].map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <p class="p-label">${esc(t("getIt"))}</p>
        <div class="p-links">${linkButtons(p)}</div>
      </div>
      <div class="gallery">${gallery(p)}</div>
    </article>`).join("");
  observeReveals();
}

/* ---------- 5. SCREENSHOT VIEWER (lightbox) ---------- */
const lightbox = $("#lightbox");
let lastFocus = null;
$("#projectList").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-full]");
  if (!btn) return;
  lastFocus = btn;
  $("#lbImg").src = btn.dataset.full;
  $("#lbImg").alt = btn.getAttribute("aria-label");
  lightbox.hidden = false;
  $("#lbClose").focus();
});
function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  lastFocus?.focus();
}
$("#lbClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

/* ---------- 6. SCROLL ANIMATIONS ---------- */
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); revealer.unobserve(en.target); }
  });
}, { threshold: 0.12 });
function observeReveals() {
  $$(".reveal:not(.visible)").forEach((el) => revealer.observe(el));
}

/* ---------- 7. CONTACT EMAIL ---------- */
const emailLink = $("#emailLink");
if (emailLink && SITE.email) {
  emailLink.href = "mailto:" + SITE.email;
  emailLink.textContent = SITE.email;
}

/* ---------- START ---------- */
applyLanguage();
observeReveals();

/* ---------- 8. 3D HERO ----------
   Loaded separately so the page shows fast. If 3D cannot run,
   the soft glow (.hero-fallback) stays instead. */
import("./hero3d.min.js?v=20261126b")
  .then((m) => m.startHero($("#hero3d")))
  .catch(() => { $("#hero3d").remove(); });
