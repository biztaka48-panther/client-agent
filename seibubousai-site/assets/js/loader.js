/**
 * loader.js — ページローダー
 */
(function() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const fill = loader.querySelector('.loader-bar-fill');

  function hideLoader() {
    loader.classList.add('is-hidden');
    document.body.style.overflow = '';
  }

  document.body.style.overflow = 'hidden';

  // プログレスバーアニメーション
  requestAnimationFrame(function() {
    if (fill) fill.style.width = '100%';
  });

  window.addEventListener('load', function() {
    setTimeout(hideLoader, 600);
  });

  // フォールバック（3秒後に強制非表示）
  setTimeout(hideLoader, 3000);
})();
