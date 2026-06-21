/**
 * counter.js — 数値カウントアップ
 */
(function() {
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function countUp(el, target, duration) {
    duration = duration || 2000;
    var suffix = el.dataset.suffix || '';
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var value = Math.floor(easeOut(progress) * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) {
          countUp(el, target, 2000);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(el) {
    observer.observe(el);
  });
})();
