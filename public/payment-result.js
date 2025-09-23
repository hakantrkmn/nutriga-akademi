(function () {
  function getTopWindow() {
    try {
      return window.top || window;
    } catch (_) {
      return window;
    }
  }

  function createBaseStyles() {
    var style = document.createElement("style");
    style.textContent = [
      ":root{--background:#ffffff;--foreground:#112825;--primary:#82541c;--primary-hover:#a87f42;--success:#6b705c;--success-text:#3e4136;--error:#ef4444;--error-text:#991b1b;--gray-600:#4b5563;--border:#e5e7eb}",
      "html,body{height:100%;margin:0}",
      "body{background:var(--background);display:flex;align-items:center;justify-content:center;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;color:var(--foreground)}",
      ".pr-card{background:var(--background);border:1px solid var(--border);border-radius:12px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1);padding:24px;max-width:420px;width:100%;text-align:center}",
      ".pr-title{font-size:20px;font-weight:700;margin:8px 0}",
      ".pr-text{color:var(--gray-600);margin:8px 0 16px}",
      ".pr-icon{font-size:56px;line-height:1;margin-bottom:8px}",
      ".pr-btn{display:inline-block;background:var(--primary);color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:600}",
      ".pr-btn:hover{background:var(--primary-hover)}",
    ].join("");
    document.head.appendChild(style);
  }

  function render(options) {
    var opts = options || {};
    var type = opts.type === "success" ? "success" : "error";
    var title =
      opts.title ||
      (type === "success" ? "Ödeme Başarılı!" : "Ödeme Başarısız");
    var message =
      opts.message ||
      (type === "success"
        ? "İşleminiz tamamlandı."
        : "İşlem tamamlanamadı. Lütfen tekrar deneyiniz.");
    var redirectUrl = opts.redirectUrl || "/";
    var redirectDelayMs =
      typeof opts.redirectDelayMs === "number" ? opts.redirectDelayMs : 3000;

    createBaseStyles();

    var container = document.createElement("div");
    container.className = "pr-card";

    var icon = document.createElement("div");
    icon.className = "pr-icon";
    icon.style.color = type === "success" ? "var(--success)" : "var(--error)";
    icon.textContent = type === "success" ? "✓" : "✗";

    var titleEl = document.createElement("div");
    titleEl.className = "pr-title";
    titleEl.style.color =
      type === "success" ? "var(--success-text)" : "var(--error-text)";
    titleEl.textContent = title;

    var textEl = document.createElement("div");
    textEl.className = "pr-text";
    textEl.textContent = message;

    var btn = document.createElement("a");
    btn.className = "pr-btn";
    btn.href = redirectUrl;
    btn.textContent = "Ana Sayfaya Dön";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      getTopWindow().location.href = redirectUrl;
    });

    container.appendChild(icon);
    container.appendChild(titleEl);
    container.appendChild(textEl);
    container.appendChild(btn);

    document.body.innerHTML = "";
    document.body.appendChild(container);

    if (redirectDelayMs > 0) {
      setTimeout(function () {
        getTopWindow().location.href = redirectUrl;
      }, redirectDelayMs);
    }
  }

  window.PaymentResult = { render: render };
})();
