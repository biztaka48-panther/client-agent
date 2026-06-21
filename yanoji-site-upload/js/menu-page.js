(function () {
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  var burger = document.getElementById('navBurger');
  var overlay = document.getElementById('mobileMenu');
  var closeBtn = document.getElementById('mobileClose');
  if (burger && overlay) {
    burger.addEventListener('click', function () { overlay.classList.add('open'); });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', function () { overlay.classList.remove('open'); });
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { overlay.classList.remove('open'); });
    });
  }

  var tabFood = document.getElementById('tab-food');
  var tabDrink = document.getElementById('tab-drink');
  var panelFood = document.getElementById('panel-food');
  var panelDrink = document.getElementById('panel-drink');

  function showPanel(which) {
    var isFood = which === 'food';
    if (tabFood) {
      tabFood.classList.toggle('active', isFood);
      tabFood.setAttribute('aria-selected', isFood ? 'true' : 'false');
    }
    if (tabDrink) {
      tabDrink.classList.toggle('active', !isFood);
      tabDrink.setAttribute('aria-selected', !isFood ? 'true' : 'false');
    }
    if (panelFood) {
      panelFood.classList.toggle('active', isFood);
      panelFood.hidden = !isFood;
    }
    if (panelDrink) {
      panelDrink.classList.toggle('active', !isFood);
      panelDrink.hidden = isFood;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (tabFood) tabFood.addEventListener('click', function () { showPanel('food'); });
  if (tabDrink) tabDrink.addEventListener('click', function () { showPanel('drink'); });

  if (window.location.hash === '#drink' && tabDrink) {
    showPanel('drink');
  }

  document.querySelectorAll('.menu-category-head').forEach(function (btn) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-item').forEach(function (el) {
    observer.observe(el);
  });
  document.querySelectorAll('.menu-hero-inner.fade-item').forEach(function (el) {
    el.classList.add('visible');
  });
})();
