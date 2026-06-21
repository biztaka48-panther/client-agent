/**
 * animations.js — スクロールアニメーション（GSAP使用時 + CSS fallback）
 */
(function() {
  // Intersection Observer によるシンプルなアニメーション（GSAPなしでも動作）
  var animClasses = ['.reveal', '.reveal-left', '.reveal-right', '.service-card', '.step-item'];

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animClasses.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      observer.observe(el);
    });
  });

  // reveal-text (clip-path)
  var revealTexts = document.querySelectorAll('.reveal-text');
  var rtObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        rtObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTexts.forEach(function(el) {
    rtObserver.observe(el);
  });

  // GSAP ScrollTrigger（ロードされている場合）
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // ヒーロー背景パララックス
    var heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // コンセプト背景パララックス
    var conceptBg = document.querySelector('.concept-bg');
    if (conceptBg) {
      gsap.to(conceptBg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#concept',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // サービスカード stagger
    var serviceCards = document.querySelectorAll('.service-card, .service-list-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        scrollTrigger: {
          trigger: serviceCards[0].closest('section') || serviceCards[0],
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'opacity,transform'
      });
    }

    // ナビゲーション変化
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: function(self) {
        var nav = document.getElementById('global-nav');
        if (nav) {
          nav.classList.toggle('nav--scrolled', self.scroll() > 80);
        }
      }
    });
  }
})();
