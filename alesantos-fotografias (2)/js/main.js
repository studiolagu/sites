(function () {
  "use strict";
  var S = window.SITE, $ = function (s, r) { return (r || document).querySelector(s) }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)) };
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML }

  /* cores */
  var rs = document.documentElement.style;
  rs.setProperty("--bg", S.colors.bg); rs.setProperty("--ink", S.colors.ink); rs.setProperty("--sage", S.colors.sage); rs.setProperty("--soft", S.colors.soft);

  /* imagens demonstrativas (SVG gerado) */
  var DIM = { tall: [800, 1100], wide: [1200, 800], square: [1000, 1000], portrait: [800, 1000] };
  var TONES = [["#c9c3b6", "#7d8b80", "#2b302c"], ["#d8d2c5", "#a8b0a2", "#4a524b"], ["#bfb5a3", "#8a8f86", "#2d2f2b"], ["#e2ddd2", "#9aa597", "#3a403a"], ["#c4bcae", "#6f7c72", "#1f2420"]];
  function ph(i, ratio, label) {
    var d = DIM[ratio] || DIM.square, w = d[0], h = d[1], t = TONES[i % TONES.length];
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + t[0] + '"/><stop offset=".55" stop-color="' + t[1] + '"/><stop offset="1" stop-color="' + t[2] + '"/></linearGradient><radialGradient id="l" cx=".3" cy=".25" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#l)"/><circle cx="' + w * .68 + '" cy="' + h * .62 + '" r="' + Math.min(w, h) * .2 + '" fill="#000" opacity=".12"/><text x="50%" y="' + (h - 34) + '" text-anchor="middle" fill="#fff" fill-opacity=".7" font-family="Georgia,serif" font-style="italic" font-size="' + Math.round(w * .032) + '">' + (label === "" ? "" : (label || "foto demonstrativa")) + '</text></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function src(item, i, ratio) { return item.src || ph(i, ratio || item.ratio, "foto demonstrativa") }

  /* marca / contatos / SEO local */
  $$("[data-brand-logo]").forEach(function (e) { var l = e.classList.contains("light") ? (S.logoLight || S.logo) : S.logo; if (l) { e.innerHTML = '<img src="' + l + '" alt="' + esc(S.brandFull) + '">'; e.classList.add("has-img"); e.setAttribute("aria-label", S.brandFull) } else { e.textContent = S.brand } });
  if (S.favicon) { var fv = document.querySelector('link[rel="icon"]'); if (fv) { fv.href = S.favicon; fv.type = "image/png" } }
  $$("[data-brand-giant]").forEach(function (e) { e.textContent = S.brand });
  $$("[data-brand-full]").forEach(function (e) { e.textContent = S.brandFull });
  $$("[data-city]").forEach(function (e) { e.textContent = S.city + ", " + S.state });
  $$("[data-region]").forEach(function (e) { e.textContent = "Lages, SC" });
  $$("[data-tagline]").forEach(function (e) { e.textContent = S.tagline });
  $("#year").textContent = new Date().getFullYear();
  var wa = "https://wa.me/" + S.contact.whatsapp;
  function waLink(msg) { return wa + (msg ? "?text=" + encodeURIComponent(msg) : "") }
  $("#waBtn").href = waLink("Olá! Vim pelo site e gostaria de solicitar um orçamento.");
  $("#waFloat").href = waLink("Olá! Vim pelo site e gostaria de solicitar um orçamento.");
  var fw = $("#fWa"); fw.href = waLink(); fw.textContent = "WhatsApp: " + S.contact.whatsappLabel;
  var fi = $("#fIg"); fi.href = "https://instagram.com/" + S.contact.instagram; fi.textContent = "Instagram: @" + S.contact.instagram;
  var fm = $("#fMail"); fm.href = "mailto:" + S.contact.email; fm.textContent = S.contact.email;
  $("#fLoc").textContent = S.city + ", " + S.state + " — " + S.serviceArea;
  var heroEl = $("#heroImg"), mq = window.matchMedia("(max-width:700px)");
  function setHero() { var mob = mq.matches, u = (mob && S.heroImageMobile) || S.heroImage || ph(4, "wide", ""); heroEl.style.backgroundImage = 'url("' + u + '")'; heroEl.style.backgroundPosition = (mob ? S.heroPositionMobile : S.heroPosition) || "center" }
  setHero(); if (mq.addEventListener) mq.addEventListener("change", setHero);
  $("#aboutImg").style.backgroundImage = 'url("' + (S.aboutImage || ph(1, "portrait", "retrato demonstrativo")) + '")';
  $("#ld-json").textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Photographer", name: S.brandFull, description: S.tagline, areaServed: S.region, address: { "@type": "PostalAddress", addressLocality: S.city, addressRegion: S.state, addressCountry: "BR" }, telephone: "+" + S.contact.whatsapp, email: S.contact.email, sameAs: ["https://instagram.com/" + S.contact.instagram] });

  /* menu mobile */
  var burger = $("#burger"), links = $("#navLinks");
  function closeMenu() { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false") }
  burger.addEventListener("click", function () { var o = links.classList.toggle("open"); burger.setAttribute("aria-expanded", o) });
  $$("a", links).forEach(function (a) { a.addEventListener("click", closeMenu) });

  /* portfólio */
  var cats = S.categories, catMap = {}; cats.forEach(function (c) { catMap[c.id] = c.label });
  var current = "all", ori = "all", expanded = false, LIMIT = 8, visible = [];
  var ORI = { wide: "paisagem", tall: "retrato", portrait: "retrato" }; /* square = só aparece em "Todas" */
  var oriFilters = $("#oriFilters");
  [["all", "Todas as orientações"], ["paisagem", "Paisagem"], ["retrato", "Retrato"]].forEach(function (o) {
    var b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", o[0] === ori); b.textContent = o[1]; b.dataset.id = o[0];
    b.addEventListener("click", function () { ori = o[0]; expanded = false; renderGrid(); $$("button", oriFilters).forEach(function (x) { x.setAttribute("aria-selected", x.dataset.id === ori) }) });
    oriFilters.appendChild(b);
  });
  var filters = $("#filters");
  function mkFilter(id, label) { var b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", id === current); b.textContent = label; b.dataset.id = id; b.addEventListener("click", function () { current = id; expanded = false; renderGrid(); $$("button", filters).forEach(function (x) { x.setAttribute("aria-selected", x.dataset.id === current) }) }); filters.appendChild(b) }
  mkFilter("all", "Todos");
  var used = {}; S.portfolio.forEach(function (p) { used[p.cat] = 1 });
  cats.forEach(function (c) { if (used[c.id]) mkFilter(c.id, c.label) });
  function renderGrid() {
    var all = S.portfolio.map(function (p, i) { return Object.assign({ _i: i }, p) }).filter(function (p) { return (current === "all" || p.cat === current) && (ori === "all" || ORI[p.ratio] === ori) });
    if (!all.length) { $("#grid").innerHTML = '<p class="empty">Nenhuma foto nesta combinação de categoria e orientação.</p>'; visible = []; $("#moreBtn").style.display = "none"; return }
    visible = expanded ? all : all.slice(0, LIMIT);
    var g = $("#grid"); g.innerHTML = "";
    visible.forEach(function (p, n) {
      var b = document.createElement("button"); b.type = "button"; b.className = "card"; b.style.animationDelay = (n * 50) + "ms";
      var s = p.thumb || src(p, p._i);
      b.innerHTML = '<img src="' + s + '" alt="' + esc(p.title + " — " + (catMap[p.cat] || "") + " em Lages, SC") + '" loading="lazy" decoding="async"><span class="cap"><b>' + esc(p.title) + '</b><span>' + esc((p.project ? p.project + " · " : "") + (catMap[p.cat] || "")) + '</span></span>';
      b.addEventListener("click", function () { openLb(n) });
      g.appendChild(b);
    });
    var more = $("#moreBtn"); more.style.display = (!expanded && all.length > LIMIT) ? "" : "none";
  }
  $("#moreBtn").addEventListener("click", function () { expanded = true; renderGrid() });
  renderGrid();

  /* lightbox */
  var lb = $("#lb"), idx = 0, lastFocus;
  function showLb() { var p = visible[idx]; $("#lbImg").src = src(p, p._i); $("#lbImg").alt = p.title + " — " + (catMap[p.cat] || ""); $("#lbCap").textContent = p.title + (p.project ? " · " + p.project : "") }
  function openLb(i) { idx = i; lastFocus = document.activeElement; showLb(); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus() }
  function closeLb() { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus() }
  function step(d) { idx = (idx + d + visible.length) % visible.length; showLb() }
  $("#lbClose").addEventListener("click", closeLb); $("#lbPrev").addEventListener("click", function () { step(-1) }); $("#lbNext").addEventListener("click", function () { step(1) });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb() });
  $("#lbFull").addEventListener("click", function () { if (document.fullscreenElement) { document.exitFullscreen() } else if (lb.requestFullscreen) { lb.requestFullscreen() } });
  document.addEventListener("keydown", function (e) { if (lb.hidden) return; if (e.key === "Escape") closeLb(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1) });
  var tx = 0; lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX }, { passive: true });
  lb.addEventListener("touchend", function (e) { var d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) step(d > 0 ? -1 : 1) });

  /* serviços */
  var sg = $("#svcGrid");
  S.services.forEach(function (s, i) {
    var el = document.createElement("article"); el.className = "svc reveal";
    el.innerHTML = '<img src="' + (s.src || ph(i + 2, "wide", "foto demonstrativa")) + '" alt="' + esc(s.name + " — fotografia em Lages, SC") + '" loading="lazy" decoding="async"><div class="svc-body"><h3>' + esc(s.name) + '</h3><p>' + esc(s.desc) + '</p><ul>' + s.includes.map(function (x) { return "<li>" + esc(x) + "</li>" }).join("") + '</ul><a class="btn btn-dark" href="#contato" data-tipo="' + esc(s.name) + '">Solicitar orçamento</a></div>';
    sg.appendChild(el);
  });

  /* diferenciais */
  var dg = $("#diffGrid");
  S.differentials.forEach(function (d, i) { var el = document.createElement("div"); el.className = "diff-item reveal"; el.innerHTML = '<div class="n">0' + (i + 1) + '</div><h3>' + esc(d.title) + '</h3><p>' + esc(d.text) + '</p>'; dg.appendChild(el) });

  /* depoimentos */
  var tg = $("#testiGrid");
  S.testimonials.forEach(function (t) { var el = document.createElement("figure"); el.className = "t-card reveal"; el.innerHTML = (t.demo ? '<span class="badge">Exemplo demonstrativo</span>' : "") + '<blockquote>“' + esc(t.text) + '”</blockquote><figcaption class="t-meta"><div class="avatar" aria-hidden="true">' + esc(t.name.charAt(0)) + '</div><div><b>' + esc(t.name) + '</b><span>' + esc(t.type) + '</span></div></figcaption>'; tg.appendChild(el) });

  /* FAQ */
  var fl = $("#faqList");
  S.faq.forEach(function (f) { var d = document.createElement("details"); d.innerHTML = '<summary>' + esc(f.q) + '</summary><div class="ans">' + esc(f.a) + '</div>'; fl.appendChild(d) });

  /* formulário */
  var tipo = $("#f-tipo");
  cats.forEach(function (c) { var o = document.createElement("option"); o.value = c.label; o.textContent = c.label; tipo.appendChild(o) });
  var other = document.createElement("option"); other.value = "Outro"; other.textContent = "Outro"; tipo.appendChild(other);
  $$("[data-tipo]").forEach(function (a) { a.addEventListener("click", function () { var v = a.dataset.tipo; for (var i = 0; i < tipo.options.length; i++) { if (v.indexOf(tipo.options[i].value) === 0 && tipo.options[i].value) { tipo.selectedIndex = i; break } } }) });
  var form = $("#quoteForm"), status = $("#formStatus");
  $("#f-data").min = new Date().toISOString().slice(0, 10);
  $("#f-whats").addEventListener("input", function (e) { var d = e.target.value.replace(/\D/g, "").slice(0, 11), o = d; if (d.length > 6) o = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length > 10 ? 7 : 6) + "-" + d.slice(d.length > 10 ? 7 : 6); else if (d.length > 2) o = "(" + d.slice(0, 2) + ") " + d.slice(2); e.target.value = o });
  function setErr(name, msg) { var f = form.elements[name].closest(".field"); f.classList.toggle("invalid", !!msg); $('.err[data-for="' + name + '"]', form).textContent = msg || "" }
  function validate() {
    var v = function (n) { return form.elements[n].value.trim() }, ok = true;
    var rules = {
      nome: function () { return v("nome").length < 2 ? "Informe seu nome." : "" },
      email: function () { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email")) ? "" : "Informe um e-mail válido." },
      whats: function () { var l = v("whats").replace(/\D/g, "").length; return (l === 10 || l === 11) ? "" : "Informe DDD + número (ex.: 49 90000-0000)." },
      tipo: function () { return v("tipo") ? "" : "Selecione o tipo de fotografia." },
      local: function () { return v("local").length < 2 ? "Informe o local do ensaio ou evento." : "" },
      data: function () { var d = v("data"); return (d && d < form.elements.data.min) ? "Escolha uma data futura." : "" }
    };
    Object.keys(rules).forEach(function (k) { var m = rules[k](); setErr(k, m); if (m) ok = false });
    return ok;
  }
  $$("input,select", form).forEach(function (el) { el.addEventListener("blur", function () { if (el.value || el.required) validate() }) });
  form.addEventListener("submit", function (e) {
    e.preventDefault(); status.className = "form-status full";
    if (!validate()) { status.textContent = "Confira os campos destacados e tente novamente."; status.classList.add("bad"); var f = $(".invalid input,.invalid select", form); if (f) f.focus(); return }
    var g = function (n) { return form.elements[n].value.trim() };
    var d = g("data"); if (d) { var p = d.split("-"); d = p[2] + "/" + p[1] + "/" + p[0] }
    var msg = "Olá! Gostaria de solicitar um orçamento.\n\n*Nome:* " + g("nome") + "\n*E-mail:* " + g("email") + "\n*WhatsApp:* " + g("whats") + "\n*Tipo de fotografia:* " + g("tipo") + "\n*Data prevista:* " + (d || "A definir") + "\n*Local:* " + g("local") + (g("msg") ? "\n*Detalhes:* " + g("msg") : "");
    var url = waLink(msg);
    status.innerHTML = 'Tudo certo! Abrimos o WhatsApp com seus dados. Se não abrir, <a href="' + url + '" target="_blank" rel="noopener"><u>clique aqui</u></a>.';
    status.classList.add("ok");
    window.open(url, "_blank", "noopener");
    form.reset();
  });

  /* animação de rolagem */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target) } }) }, { threshold: .12 });
    $$(".reveal").forEach(function (el) { io.observe(el) });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in") }) }

  /* link ativo no menu */
  if ("IntersectionObserver" in window) {
    var secs = $$("main section[id]"), ao = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { $$(".nav-links a").forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + x.target.id) }) } }) }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { ao.observe(s) });
  }
})();
