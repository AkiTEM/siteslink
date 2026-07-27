(function () {
  'use strict';
  var path = window.location.pathname.replace(/^\/|\/$/g, '');
  if (!path) return;
  fetch('/config.json?t=' + Date.now())
    .then(function (r) { return r.json(); })
    .then(function (cfg) {
      var site = cfg.sites[path];
      if (site && site.active === false) {
        document.body.innerHTML =
          '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:Inter,system-ui,sans-serif;background:#0a0a0b;color:#e4e4e7;text-align:center;padding:24px 20px;box-sizing:border-box">' +
          '<div style="width:48px;height:48px;border-radius:50%;background:rgba(167,139,250,.1);display:flex;align-items:center;justify-content:center;margin-bottom:20px">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' +
          '</div>' +
          '<h1 style="font-size:clamp(1.1rem,4vw,1.5rem);font-weight:600;margin:0 0 8px;max-width:320px;line-height:1.4;word-break:break-word">Página temporariamente indisponível</h1>' +
          '<p style="color:#71717a;font-size:clamp(.8rem,3vw,.875rem);margin:0;max-width:280px;line-height:1.6">Estamos trabalhando em melhorias.<br>Volte em breve.</p>' +
          '</div>';
      }
    })
    .catch(function () {});
})();
