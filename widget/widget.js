/*
 * Embeddable AI chat widget (bez zavisnosti).
 * Ugradnja na bilo koji sajt:
 *   <script src="https://TVOJ-DOMEN/widget/widget.js"
 *           data-endpoint="https://TVOJ-DOMEN/api/chat"
 *           data-title="Lena AI"
 *           data-greeting="Zdravo! Kako mogu da pomognem?"
 *           data-color="#c2185b"
 *           data-client="salon"></script>   (data-client: samo za demo deploy)
 */
(function () {
  var s = document.currentScript;
  if (window.__aicLoaded) return; // sprecava dupli widget
  window.__aicLoaded = true;
  var endpoint = s.getAttribute("data-endpoint") || "/api/chat";
  var title = s.getAttribute("data-title") || "Asistent";
  var greeting = s.getAttribute("data-greeting") || "Zdravo! Kako mogu da pomognem?";
  var color = s.getAttribute("data-color") || "#2563eb";
  var client = s.getAttribute("data-client") || "";
  var suggestions = (s.getAttribute("data-suggestions") || "").split("|").map(function (x) { return x.trim(); }).filter(Boolean).slice(0, 4);
  var errorText = s.getAttribute("data-error") || "Doslo je do greske. Pokusajte ponovo.";

  var css =
    ".aic-btn{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:50%;border:0;background:" + color + ";color:#fff;font-size:26px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25);z-index:99998}" +
    ".aic-box{position:fixed;right:20px;bottom:88px;width:340px;max-width:calc(100vw - 24px);height:460px;max-height:calc(100vh - 110px);background:#fff;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,.28);display:none;flex-direction:column;overflow:hidden;z-index:99999;font:14px/1.4 system-ui,sans-serif}" +
    ".aic-box.open{display:flex}" +
    ".aic-head{background:" + color + ";color:#fff;padding:12px 14px;font-weight:600;display:flex;justify-content:space-between;align-items:center}" +
    ".aic-x{background:none;border:0;color:#fff;font-size:20px;cursor:pointer}" +
    ".aic-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#f6f7f9}" +
    ".aic-m{max-width:85%;padding:8px 11px;border-radius:12px;word-wrap:break-word}" +
    ".aic-m.user{white-space:pre-wrap}" +
    ".aic-m p{margin:0 0 8px}.aic-m ul{margin:0 0 8px;padding-left:18px}.aic-m li{margin:2px 0}.aic-m>:last-child{margin-bottom:0}" +
    ".aic-btn.aic-hop{animation:aic-hop .35s ease-in-out}" +
    "@keyframes aic-hop{0%,100%{transform:translateY(0) scale(1)}45%{transform:translateY(-3px) scale(1.04)}}" +
    ".aic-chips{display:flex;flex-wrap:wrap;gap:6px;align-self:flex-start;max-width:92%}" +
    ".aic-chip{border:1px solid " + color + ";background:#fff;color:" + color + ";border-radius:999px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;transition:background .2s,color .2s,transform .2s;animation:aic-chip .35s ease both}" +
    ".aic-chip:hover{background:" + color + ";color:#fff;transform:translateY(-1px)}" +
    "@keyframes aic-chip{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}" +
    ".aic-ov{display:none;position:fixed;inset:0;background:rgba(15,23,42,.4);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);opacity:0;pointer-events:none;transition:opacity .3s ease;z-index:99997}" +
    ".aic-ov.open{opacity:1;pointer-events:auto}" +
    "@media (max-width:600px){" +
      ".aic-ov{display:block}" +
      ".aic-box{left:10px;right:10px;width:auto;max-width:none;top:var(--aic-top,10vh);bottom:auto;height:var(--aic-h,70vh);max-height:none;border-radius:18px;transition:top .3s cubic-bezier(.2,.8,.2,1),height .3s cubic-bezier(.2,.8,.2,1)}" +
      ".aic-box.open{animation:aic-pop-m .34s cubic-bezier(.2,.8,.2,1) both}" +
      ".aic-box.closing{animation:aic-out-m .2s ease-in forwards}" +
      "@keyframes aic-pop-m{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}" +
      "@keyframes aic-out-m{from{opacity:1;transform:none}to{opacity:0;transform:translateY(16px) scale(.97)}}" +
      ".aic-in{font-size:16px}" +
      ".aic-x{font-size:30px;line-height:1;padding:0 6px}" +
      "html.aic-open{overflow:hidden}" +
      "html.aic-open .aic-btn{display:none}" +
    "}" +
    "@media (min-width:601px){.aic-box.open{animation:aic-pop .22s ease-out}.aic-box.closing{animation:aic-out .18s ease-in forwards}}" +
    "@keyframes aic-out{to{opacity:0;transform:translateY(8px) scale(.98)}}" +
    "@keyframes aic-pop{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}" +
    ".aic-dots{display:inline-flex;align-items:center;gap:5px;height:18px}" +
    ".aic-dots i{width:7px;height:7px;border-radius:50%;background:#9ca3af;animation:aic-b 1.2s infinite ease-in-out}" +
    ".aic-dots i:nth-child(2){animation-delay:.15s}.aic-dots i:nth-child(3){animation-delay:.3s}" +
    "@keyframes aic-b{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}" +
    "@media (prefers-reduced-motion:reduce){.aic-box.open,.aic-box.closing,.aic-btn.aic-hop,.aic-dots i,.aic-chip{animation:none}}" +
    ".aic-m.bot{background:#fff;color:#111;align-self:flex-start;border:1px solid #e5e7eb}" +
    ".aic-m.user{background:" + color + ";color:#fff;align-self:flex-end}" +
    ".aic-form{display:flex;gap:6px;padding:10px;border-top:1px solid #e5e7eb;background:#fff}" +
    ".aic-in{flex:1;border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font:inherit}" +
    ".aic-send{border:0;border-radius:8px;background:" + color + ";color:#fff;padding:0 14px;cursor:pointer;font:inherit}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement("button");
  btn.className = "aic-btn";
  btn.setAttribute("aria-label", title);
  btn.textContent = "💬";

  var box = document.createElement("div");
  box.className = "aic-box";
  box.innerHTML =
    '<div class="aic-head"><span></span><button class="aic-x" aria-label="Close">×</button></div>' +
    '<div class="aic-msgs"></div>' +
    '<form class="aic-form"><input class="aic-in" maxlength="500" autocomplete="off"><button class="aic-send" type="submit">➤</button></form>';
  box.querySelector(".aic-head span").textContent = title;

  var ov = document.createElement("div");
  ov.className = "aic-ov";

  function mount() {
    document.body.appendChild(btn);
    document.body.appendChild(ov);
    document.body.appendChild(box);
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
  var msgs = box.querySelector(".aic-msgs");
  var input = box.querySelector(".aic-in");
  var history = [];
  var busy = false;


  // Siguran prikaz odgovora: "- " redovi postaju lista, prazan red razdvaja pasuse.
  // Sve ide preko textContent / createElement (nema innerHTML, nema XSS).
  function render(el, text) {
    el.textContent = "";
    var lines = String(text).split("\n");
    var para = null, list = null;
    function flush() { para = null; list = null; }
    lines.forEach(function (raw) {
      var line = raw.trim();
      if (!line) { flush(); return; }
      var m = line.match(/^[-*\u2022]\s+(.*)$/);
      if (m) {
        if (!list) { list = document.createElement("ul"); el.appendChild(list); para = null; }
        var li = document.createElement("li");
        li.textContent = m[1];
        list.appendChild(li);
      } else {
        if (!para) { para = document.createElement("p"); el.appendChild(para); list = null; }
        else para.appendChild(document.createElement("br"));
        para.appendChild(document.createTextNode(line));
      }
    });
    if (!el.firstChild) el.textContent = String(text);
  }

  function add(text, who) {
    var d = document.createElement("div");
    d.className = "aic-m " + who;
    d.textContent = text; // textContent, ne innerHTML (bez XSS)
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  add(greeting, "bot");

  var chips = null;
  if (suggestions.length) {
    chips = document.createElement("div");
    chips.className = "aic-chips";
    suggestions.forEach(function (label, i) {
      var c = document.createElement("button");
      c.type = "button";
      c.className = "aic-chip";
      c.style.animationDelay = (0.15 + i * 0.08) + "s";
      c.textContent = label; // textContent (bez XSS)
      c.addEventListener("click", function () {
        input.value = label;
        form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
      chips.appendChild(c);
    });
    msgs.appendChild(chips);
  }

  function isMobile() { return window.matchMedia("(max-width:600px)").matches; }
  // Na telefonu chat prati vidljivi deo ekrana (iznad tastature), da se naslov i polje uvek vide.
  function fit() {
    var vv = window.visualViewport;
    if (!isMobile() || !vv) {
      box.style.removeProperty("--aic-h");
      box.style.removeProperty("--aic-top");
      return;
    }
    var h = Math.min(500, vv.height - 20);
    var top = vv.offsetTop + Math.max(10, (vv.height - h) / 2);
    box.style.setProperty("--aic-h", Math.round(h) + "px");
    box.style.setProperty("--aic-top", Math.round(top) + "px");
  }
  // posle glatke promene visine, poruke ostaju skrolovane do dna
  box.addEventListener("transitionend", function () { msgs.scrollTop = msgs.scrollHeight; });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", fit);
    window.visualViewport.addEventListener("scroll", fit);
  }
  window.addEventListener("resize", fit);

  var closeTimer = null;
  function setOpen(v) {
    clearTimeout(closeTimer);
    ov.classList.toggle("open", v);
    document.documentElement.classList.toggle("aic-open", v && isMobile());
    if (v) {
      box.classList.remove("closing");
      box.classList.add("open");
      fit();
      if (!isMobile()) input.focus(); // na telefonu ne otvaramo tastaturu sami
    } else if (box.classList.contains("open")) {
      box.classList.add("closing"); // glatko zatvaranje, pa sakrivanje
      closeTimer = setTimeout(function () {
        box.classList.remove("open", "closing");
      }, 200);
    }
  }

  btn.addEventListener("click", function () {
    btn.classList.remove("aic-hop");
    void btn.offsetWidth; // restart animacije pri brzom ponovnom kliku
    btn.classList.add("aic-hop");
    setOpen(!box.classList.contains("open"));
  });
  btn.addEventListener("animationend", function () { btn.classList.remove("aic-hop"); });

  // Klik van chata (ili Escape) zatvara chat.
  document.addEventListener("click", function (e) {
    if (!box.classList.contains("open")) return;
    if (box.contains(e.target) || btn.contains(e.target)) return;
    setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
  box.querySelector(".aic-x").addEventListener("click", function () { setOpen(false); });

  // data-open="1": otvori chat odmah (kad je kupac kliknuo na ikonicu pre nego sto se widget ucitao)
  if (s.getAttribute("data-open") === "1") setOpen(true);

  var form = box.querySelector(".aic-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    if (chips && chips.parentNode) chips.parentNode.removeChild(chips);
    add(text, "user");
    busy = true;
    var typing = add("", "bot");
    typing.className += " aic-typing";
    typing.setAttribute("aria-label", "Typing");
    var dots = document.createElement("span");
    dots.className = "aic-dots";
    for (var k = 0; k < 3; k++) dots.appendChild(document.createElement("i"));
    typing.appendChild(dots);
    msgs.scrollTop = msgs.scrollHeight;

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: history.slice(-10), client: client }),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.reply) throw new Error("bad");
        render(typing, res.d.reply);
        history.push({ role: "user", content: text });
        history.push({ role: "assistant", content: res.d.reply });
      })
      .catch(function () { typing.textContent = errorText; })
      .then(function () { busy = false; msgs.scrollTop = msgs.scrollHeight; });
  });
})();
