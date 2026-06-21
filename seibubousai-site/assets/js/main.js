/**
 * main.js — 初期化・共通処理
 */
document.addEventListener('DOMContentLoaded', function() {
  // FAQ アコーディオン
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function() {
      var isOpen = item.classList.contains('is-open');
      // 他を閉じる
      faqItems.forEach(function(other) {
        if (other !== item) {
          other.classList.remove('is-open');
          var otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '';
        }
      });

      item.classList.toggle('is-open', !isOpen);
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '';
      }
    });
  });

  // マーキー複製（無限ループ用）
  var marqueeInner = document.querySelector('.marquee-inner');
  if (marqueeInner) {
    var clone = marqueeInner.cloneNode(true);
    marqueeInner.parentNode.appendChild(clone);
  }

  // スムーズスクロール（ハッシュリンク）
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});
