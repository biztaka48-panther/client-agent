/**
 * Instagram Graph API 連携（静的HTML用）
 * 同一リポジトリの Next.js の GET /api/instagram/feed を公開し、
 * data-feed-url にそのフルURLを設定してください（トークンはサーバーのみ）。
 */
(function () {
  function injectCss() {
    if (document.getElementById("ig-graph-feed-styles")) return;
    var st = document.createElement("style");
    st.id = "ig-graph-feed-styles";
    st.textContent =
      ".ig-graph-feed{max-width:960px;margin:1rem auto 0}" +
      ".ig-graph-feed__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem}" +
      "@media (min-width:768px){.ig-graph-feed__grid{grid-template-columns:repeat(3,1fr);gap:1rem}}" +
      ".ig-graph-feed__cell{position:relative;aspect-ratio:1;overflow:hidden;border-radius:.5rem;background:#111}" +
      ".ig-graph-feed__cell img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}" +
      ".ig-graph-feed__cell a:hover img{transform:scale(1.05)}" +
      ".ig-graph-feed__note,.ig-graph-feed__hint{font-size:.875rem;color:#555;margin-top:.75rem;line-height:1.65}" +
      ".ig-graph-feed__error{color:#a40000;font-size:.875rem;margin-top:.75rem;line-height:1.65}" +
      ".ig-graph-feed__hint code{font-size:.75rem;background:#f3f4f6;padding:.1rem .25rem;border-radius:4px}";
    document.head.appendChild(st);
  }

  function appendNote(parent, textBeforeLink, href, linkText) {
    var p = document.createElement("p");
    p.className = "ig-graph-feed__hint";
    p.appendChild(document.createTextNode(textBeforeLink + " "));
    var a = document.createElement("a");
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = linkText;
    p.appendChild(a);
    p.appendChild(document.createTextNode(" "));
    parent.appendChild(p);
  }

  function renderPosts(root, posts, profileUrl) {
    injectCss();
    root.textContent = "";
    var wrap = document.createElement("div");
    wrap.className = "ig-graph-feed";
    var grid = document.createElement("div");
    grid.className = "ig-graph-feed__grid";
    posts.forEach(function (p) {
      if (p.media_type !== "IMAGE" && p.media_type !== "CAROUSEL_ALBUM") return;
      var url = p.media_url;
      if (!url) return;
      var a = document.createElement("a");
      a.href = p.permalink || profileUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "ig-graph-feed__cell";
      var img = document.createElement("img");
      img.src = url;
      var cap = p.caption ? String(p.caption).slice(0, 200) : "Instagram";
      img.alt = cap;
      img.loading = "lazy";
      img.decoding = "async";
      a.appendChild(img);
      grid.appendChild(a);
    });
    wrap.appendChild(grid);
    root.appendChild(wrap);
    var row = document.createElement("p");
    row.className = "ig-graph-feed__note";
    row.style.textAlign = "center";
    row.style.marginTop = "1rem";
    var link = document.createElement("a");
    link.href = profileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Instagramでもっと見る";
    row.appendChild(link);
    root.appendChild(row);
  }

  function initRoot(root) {
    var feedUrl = (root.getAttribute("data-feed-url") || "").trim();
    if (!feedUrl && typeof window.__IG_FEED_API_URL__ === "string") {
      feedUrl = String(window.__IG_FEED_API_URL__).trim();
    }
    var profileUrl = (root.getAttribute("data-profile-url") || "https://www.instagram.com/").trim();
    var limit = parseInt(root.getAttribute("data-limit") || "9", 10) || 9;

    if (!feedUrl) {
      injectCss();
      root.textContent = "";
      appendNote(
        root,
        "Instagram公式APIで取得した投稿をここに表示します。data-feed-url に Next.js 等の /api/instagram/feed のURLを設定してください。設定前は",
        profileUrl,
        "Instagramプロフィール",
      );
      return;
    }

    var sep = feedUrl.indexOf("?") >= 0 ? "&" : "?";
    var url = feedUrl + sep + "limit=" + limit;

    fetch(url, { credentials: "omit" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        var posts = data && data.posts;
        if (!posts || !posts.length) {
          root.textContent = "";
          appendNote(root, "表示できる投稿がありません。", profileUrl, "Instagramを見る");
          return;
        }
        renderPosts(root, posts, profileUrl);
      })
      .catch(function () {
        root.textContent = "";
        var p = document.createElement("p");
        p.className = "ig-graph-feed__error";
        p.appendChild(document.createTextNode("フィードの取得に失敗しました。 "));
        var a = document.createElement("a");
        a.href = profileUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Instagramをご覧ください";
        p.appendChild(a);
        root.appendChild(p);
      });
  }

  function init() {
    document.querySelectorAll("[data-ig-graph-feed]").forEach(initRoot);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
