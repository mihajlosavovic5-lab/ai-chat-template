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
  var endpoint = s.getAttribute("data-endpoint") || "/api/chat";
  var title = s.getAttribute("data-title") || "Asistent";
  var greeting = s.getAttribute("data-greeting") || "Zdravo! Kako mogu da pomognem?";
  var color = s.getAttribute("data-color") || "#2563eb";
  var client = s.getAttribute("data-client") || "";
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

  document.body.appendChild(btn);
  document.body.appendChild(box);

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

  btn.addEventListener("click", function () {
    box.classList.toggle("open");
    if (box.classList.contains("open")) input.focus();
  });
  box.querySelector(".aic-x").addEventListener("click", function () {
    box.classList.remove("open");
  });

  box.querySelector(".aic-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || busy) return;
    input.value = "";
    add(text, "user");
    busy = true;
    var typing = add("...", "bot");

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
