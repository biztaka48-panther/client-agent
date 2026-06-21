(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 860px)").matches) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Instagram embed.js（レガシー埋め込み用）。blockquote がある場合のみ読み込む。
  var igContainer = document.getElementById("instagram-embed-root");
  var hasLegacyEmbed = igContainer && igContainer.querySelector(".instagram-media");
  if (hasLegacyEmbed && !document.querySelector('script[src*="instagram.com/embed.js"]')) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    s.onerror = function () {
      igContainer.innerHTML =
        '<p class="lead" style="padding:1rem;text-align:center;">Instagramの埋め込みを読み込めませんでした。下のボタンから公式アカウントをご覧ください。</p>';
    };
    document.body.appendChild(s);
  }
})();
