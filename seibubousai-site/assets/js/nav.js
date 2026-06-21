/**
 * nav.js — グローバルナビゲーション
 */
(function() {
  const nav = document.getElementById('global-nav');
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.nav-drawer');

  if (!nav) return;

  // スクロールで背景変化
  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // ハンバーガー
  if (hamburger && drawer) {
    hamburger.addEventListener('click', function() {
      const isOpen = hamburger.classList.toggle('is-open');
      drawer.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // ドロワー内リンククリックで閉じる
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        hamburger.classList.remove('is-open');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // アクティブリンク
  const links = nav.querySelectorAll('a[href]');
  const currentPath = window.location.pathname;
  links.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('is-active');
    }
  });
})();
