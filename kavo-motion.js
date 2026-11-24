(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function boot() {
    var sc = document.querySelector('.kavo');
    if (!sc) return false;
    if (document.getElementById('kavo-fx')) return true;
    var fx = document.createElement('div'); fx.id = 'kavo-fx'; fx.setAttribute('aria-hidden', 'true');
    var words = 'PERFORMANCE \u2022 RESULTS \u2022 GROWTH \u2022 ROAS \u2022 ';
    var b1 = document.createElement('div'); b1.className = 'fx-band b1'; b1.textContent = words + words + words;
    var b2 = document.createElement('div'); b2.className = 'fx-band b2'; b2.textContent = 'KAVO \u2022 SCALE \u2022 KAVO \u2022 SCALE \u2022 KAVO \u2022 SCALE \u2022 KAVO \u2022 SCALE \u2022 ';
    fx.appendChild(b1); fx.appendChild(b2);
    var shards = [];
    var defs = [[8, 22, 54, 0.5, 0.9], [86, 14, 38, -0.7, 1.4], [14, 70, 70, 0.9, 0.6], [78, 64, 46, -0.4, 1.1], [48, 8, 30, 0.6, 1.7], [60, 82, 60, -0.8, 0.8], [30, 40, 26, 1.1, 1.3], [92, 44, 34, 0.5, 0.7]];
    defs.forEach(function (d, i) {
      var s = document.createElement('div');
      if (i % 3 === 2) { s.className = 'fx-ring'; s.style.width = s.style.height = d[2] * 1.6 + 'px'; }
      else { s.className = 'fx-shard'; s.style.width = d[2] + 'px'; s.style.height = d[2] * (i % 2 ? 1.5 : 0.8) + 'px'; s.style.filter = 'blur(' + (i % 2 ? 0 : 1.5) + 'px)'; }
      s.style.left = d[0] + '%'; s.style.top = d[1] + '%'; fx.appendChild(s); shards.push({ el: s, rot: d[3], spd: d[4] });
    });
    document.body.insertBefore(fx, document.body.firstChild);
    var prog = document.createElement('div'); prog.id = 'kavo-prog'; document.body.appendChild(prog);

    var cur = 0, tgt = 0, running = false;
    function frame() {
      var vh = sc.clientHeight, max = Math.max(1, sc.scrollHeight - vh);
      tgt = sc.scrollTop; cur += (tgt - cur) * 0.14; if (Math.abs(tgt - cur) < 0.3) cur = tgt;
      var p = cur / max;
      prog.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      if (!reduce) {
        b1.style.transform = 'translate3d(' + (-cur * 0.9 - 40) + 'px,0,0)';
        b2.style.transform = 'translate3d(' + (cur * 0.7 - 1800) + 'px,0,0)';
        shards.forEach(function (s, i) {
          var y = -cur * 0.25 * s.spd, r = cur * 0.08 * s.rot;
          s.el.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0) rotate(' + r.toFixed(1) + 'deg) scale(' + (1 + Math.sin(cur / 400 + i) * 0.08).toFixed(3) + ')';
        });
        var hero = sc.querySelector('.kavo-hero');
        if (hero) hero.style.setProperty('--hp', clamp(cur / (hero.offsetHeight * 0.9), 0, 1).toFixed(3));
        var els = sc.querySelectorAll('.kavo-reveal');
        for (var k = 0; k < els.length; k++) {
          var r = els[k].getBoundingClientRect();
          var rv = clamp((vh * 1.02 - r.top) / (vh * 0.26), 0, 1);
          rv = rv * rv * (3 - 2 * rv);
          els[k].style.setProperty('--rv', rv.toFixed(3));
        }
      }
      if (Math.abs(tgt - cur) > 0.3) requestAnimationFrame(frame); else running = false;
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
    sc.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    new MutationObserver(kick).observe(sc, { childList: true, subtree: true });
    kick();
    return true;
  }
  var n = 0, t = setInterval(function () { if (boot() || ++n > 100) clearInterval(t); }, 100);
})();
