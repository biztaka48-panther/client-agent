# 🍶 Web サイト設計書 ver 2.0
## お酒と食彩 **家のじ**（ヤノジ）
### 鹿児島天文館 居酒屋・食彩

> 設計書 v2.0 — 店舗情報・予約システム・Instagram連携 完全版

---

## 0. 確定店舗情報

```
店舗名:     お酒と食彩 家のじ（ヤノジ）
住所:       〒892-0842 鹿児島県鹿児島市東千石町4−29−63 ビルⅡ 2階
電話:       099-239-2777
最寄り駅:   天文館通駅（徒歩圏内）
Instagram:  @yanoji2777
予算目安:   ¥6,000〜¥7,999

■ 営業時間
  月曜日     定休日
  火〜土     17:00〜23:00（L.O. 22:30）
  日曜日     17:00〜22:00（L.O. 21:30）
```

---

## 1. デザインコンセプト

### 1-1. 方向性

```
「天文館の2階、灯りが漏れる扉の向こうへ。」

路地裏の隠れ家 × 旬の食彩が光る食卓 × 店主の人柄が伝わる温もり
```

### 1-2. カラーパレット

```css
:root {
  /* ─── ベースカラー ─────────────────────── */
  --color-bg:         #110D07;  /* 漆黒（闇夜の背景）      */
  --color-bg-warm:    #1E1409;  /* 燻し木（セクション背景） */
  --color-surface:    #2A1B0C;  /* カード・表面            */
  --color-paper:      #F2E8D0;  /* 和紙（明るいセクション） */

  /* ─── アクセントカラー ────────────────── */
  --color-amber:      #C8781A;  /* 山吹色（CTAボタン等）   */
  --color-gold:       #E8B84B;  /* 金（見出しアクセント）   */
  --color-crimson:    #B03020;  /* 朱（予約・強調）         */

  /* ─── テキスト ──────────────────────── */
  --color-text:       #EDE0C8;  /* 本文テキスト            */
  --color-text-sub:   #9A8060;  /* サブテキスト            */
  --color-text-dark:  #2A1B0C;  /* 明るい背景上テキスト    */

  /* ─── 季節アクセント（JS切替）─────────── */
  --season-color:     #7CB87C;  /* 春: 若草 / 夏: #2E8B6E  */
                                /* 秋: #B85C2C / 冬: #4A6FA5 */
}
```

### 1-3. タイポグラフィ

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?
  family=Shippori+Mincho:wght@400;600;800&
  family=Noto+Serif+JP:wght@300;400;600&
  family=Noto+Sans+JP:wght@300;400;700&
  display=swap');

--font-display: 'Shippori Mincho', serif;   /* 店名・大見出し */
--font-serif:   'Noto Serif JP', serif;      /* 本文・説明文  */
--font-ui:      'Noto Sans JP', sans-serif;  /* ナビ・フォーム */
```

---

## 2. ページ全体構成

```
┌──────────────────────────────────────────┐
│  HEADER / NAV                            │  固定ヘッダー
├──────────────────────────────────────────┤
│  #hero        ヒーロー                   │  季節写真スライドショー
├──────────────────────────────────────────┤
│  #season      今の旬                     │  ⭐ Instagram最新投稿
├──────────────────────────────────────────┤
│  #about       家のじについて              │  店主メッセージ
├──────────────────────────────────────────┤
│  #menu        お品書き                   │  タブ切替メニュー
├──────────────────────────────────────────┤
│  #reservation 予約                       │  ⭐ 予約フォーム
├──────────────────────────────────────────┤
│  #gallery     ギャラリー                 │  Instagram投稿グリッド
├──────────────────────────────────────────┤
│  #access      アクセス                   │  地図・営業時間
└──────────────────────────────────────────┘
  FOOTER
```

---

## 3. セクション詳細仕様

---

### HEADER / NAV

```
[構成]
左: ロゴ（店名テキスト or 看板画像）
右: ナビリンク（旬・メニュー・予約・アクセス）+ 📞 tel番号

[挙動]
- 初期: 透明（Hero写真が透けて見える）
- スクロール50px以降: 背景 #110D07 に滑らかに変化
- モバイル: ハンバーガーアイコン → フルスクリーンオーバーレイメニュー

[特別要素]
- 「予約する」ボタンは --color-crimson で他と差別化
- 電話番号はtap-to-callリンク: <a href="tel:0992392777">
```

---

### ① #hero — ヒーローセクション

```
[レイアウト]
- 100vh 全画面
- 背景: 季節写真クロスフェードスライドショー（5秒間隔）
- 中央オーバーレイテキスト:

    ┌───────────────────────────┐
    │ [季節バッジ 例: 🍂 今は秋] │ ← 右上、小さく
    │                           │
    │  お酒と食彩               │ ← Shippori Mincho 細字
    │  家のじ                   │ ← Shippori Mincho 超特大
    │                           │
    │  鹿児島天文館              │ ← サブ、Noto Serif
    │  旬の食彩とお酒の場        │
    │                           │
    │  [今夜の旬を見る ↓]       │ ← CTA → #season
    │  [ご予約はこちら]          │ ← CTA → #reservation
    └───────────────────────────┘
    
    ↓ スクロールインジケーター（バウンスアニメ）

[写真ローテーション詳細]
- 季節自動判定 → 対応フォルダ写真を使用
- 写真間トランジション: 3秒かけてクロスフェード
- 各写真に暗いグラデーションオーバーレイ（文字可読性確保）

[季節パーティクル]
- 春: 花びら 🌸 （CSSアニメーション、10〜15個）
- 夏: ホタル ✨ （点滅しながら漂う）
- 秋: 落ち葉 🍂 （回転しながら落下）
- 冬: 雪 ❄️ （ゆっくり落下）
```

---

### ② #season — 今の旬 ⭐

```
[目的]
「今日は〇〇が入りました！」という生きた情報をリアルタイムで伝える

[レイアウト（PC）]
┌─────────────────────────────────────┐
│  今の旬  ─── 季節ライン装飾          │
│                                     │
│  ┌──────────────┐  ┌─────────────┐  │
│  │              │  │ 📸 最新投稿  │  │
│  │ Instagram    │  │ キャプション  │  │
│  │ 最新写真     │  │ タイムスタンプ│  │
│  │ (大きく表示) │  │             │  │
│  │              │  │ Instagramで │  │
│  └──────────────┘  │ もっと見る → │  │
│      60%            └─────────────┘  │
│                          40%          │
└─────────────────────────────────────┘

[モバイル]
縦積み（写真→テキスト→ボタン）

[Instagram連携実装]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
推奨: Behold.io（無料プラン）
  URL: https://behold.so
  
  セットアップ:
  1. behold.so でアカウント作成（無料）
  2. Instagramアカウント @yanoji2777 を連携
  3. Feed ID を取得
  4. 以下コードを挿入:

  <!-- Behold最新1投稿（シングル表示） -->
  <script src="https://w.behold.so/widget.js" type="module"></script>
  <behold-widget
    feed-id="YOUR_FEED_ID"
    display="single"
    post-count="1">
  </behold-widget>

  → @yanoji2777 に投稿するたびHP自動更新 ✨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Behold JSON API（キャプション取得）]
fetch('https://feeds.behold.so/YOUR_FEED_ID')
  .then(r => r.json())
  .then(posts => {
    const latest = posts[0];
    // キャプション表示
    document.getElementById('season-text').textContent = latest.caption;
    // 日時
    const d = new Date(latest.timestamp);
    document.getElementById('season-date').textContent =
      d.toLocaleDateString('ja-JP', {month:'long', day:'numeric'});
    // 投稿へのリンク
    document.getElementById('season-link').href = latest.permalink;
  })
  .catch(() => {
    // フォールバック: デフォルトテキスト表示
    document.getElementById('season-text').textContent =
      '本日の旬の食材はInstagramでご確認ください。';
  });
```

---

### ③ #about — 家のじについて

```
[コンテンツ]
- 大きな店内/外観写真（左側、縦長）
- 店主メッセージテキスト（右側）
  例: 
  「天文館の路地に灯りをともして、
   毎晩お待ちしております。
   
   その日一番の旬の食材を仕入れ、
   丁寧に調理してお届けします。
   
   どうぞ、家のように
   くつろいでいってください。」

- 店の特徴をアイコン付きで3点表示:
  🍴 旬の食材にこだわった一品料理
  🍶 鹿児島の地酒・厳選ドリンク
  🏠 アットホームな2階の隠れ家空間

[デザイン]
- 背景: --color-paper（明るい和紙色）で温かみを演出
- テキストは --color-text-dark
- 写真は古い木枠のような border スタイル
```

---

### ④ #menu — お品書き

```
[タブ構成]
  [ 🍢 一品料理 ]  [ 🥗 前菜・おつまみ ]  [ 🍶 お酒 ]  [ ✨ 本日のおすすめ ]

[各タブのデータ構造（JSON）]
const menuData = {
  dishes: [
    { name: "（メニュー名）", price: "〇〇〇円", note: "鹿児島産", seasonal: false },
    { name: "旬の〇〇", price: "時価", note: "要確認", seasonal: true },
  ],
  starters: [ ... ],
  drinks: [
    { name: "鹿児島焼酎（芋）", price: "〇〇〇円〜", category: "焼酎" },
    { name: "生ビール", price: "〇〇〇円", category: "ビール" },
  ],
  today: [] // Instagram連携でリアルタイム更新
};

[「本日のおすすめ」タブ]
- Instagramの最新3投稿を自動取得して表示
- 写真 + キャプション1行 + 「詳しくはInstagramで」

[デザイン]
- 暗い背景（--color-bg-warm）に金文字
- seasonal: true のアイテムには季節色バッジ表示
- 「※仕入れ状況により変更の場合があります」注記
```

---

### ⑤ #reservation — ご予約 ⭐ 重要

```
[予約方式: ハイブリッド対応]

┌──────────────────────────────────────────────────────┐
│  ご予約方法                                          │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │ 📋 Webで予約 │  │ 📞 電話で予約 │  │           │  │
│  │ （おすすめ） │  │               │  │           │  │
│  └──────────────┘  └──────────────┘  └───────────┘  │
└──────────────────────────────────────────────────────┘
```

#### 予約フォーム仕様（推奨: Google Forms 埋め込み）

```
[実装方式 比較]

★推奨: Google Forms 埋め込み
  ─────────────────────────────
  メリット:
  - 完全無料、設定10分
  - 回答がGoogleスプレッドシートに自動保存
  - 店主がスマホで確認可能
  - メール通知設定可
  
  実装:
  1. Googleフォームで予約フォームを作成
  2. 「送信 → 埋め込み」でiframeコードを取得
  3. index.html に貼り付け
  4. CSSでフォームを当サイトのデザインに近づける
  
  フォーム項目:
  ・お名前（記述式）
  ・電話番号（記述式）
  ・ご来店日（日付）
  ・ご来店時間（選択式: 17:00 / 17:30 / 18:00 ... 22:00）
  ・人数（選択式: 1〜10名以上）
  ・コース・ご要望（記述式、任意）
  ・アレルギー等（記述式、任意）
  ─────────────────────────────

代替案A: Netlify Forms
  - Netlify にデプロイするだけで使える
  - 無料枠 100件/月
  - <form netlify> タグを付けるだけ

代替案B: Formspree
  - form要素に action="https://formspree.io/f/xxxxx"
  - 無料枠 50件/月

[推奨実装コード（Netlify Forms版）]

<form name="reservation" method="POST" data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/thank-you">

  <input type="hidden" name="form-name" value="reservation">
  <p class="hidden"><input name="bot-field"></p>

  <div class="form-group">
    <label for="name">お名前 *</label>
    <input type="text" id="name" name="name" required
           placeholder="山田 太郎">
  </div>

  <div class="form-group">
    <label for="phone">電話番号 *</label>
    <input type="tel" id="phone" name="phone" required
           placeholder="090-1234-5678">
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="date">ご来店日 *</label>
      <input type="date" id="date" name="date" required
             min="">  <!-- JSで今日以降をセット -->
    </div>
    <div class="form-group">
      <label for="time">ご来店時間 *</label>
      <select id="time" name="time" required>
        <option value="">選択してください</option>
        <!-- 火〜土: 17:00〜22:30 -->
        <!-- 日: 17:00〜21:30 -->
        <!-- ※選択日の曜日に応じてJSで動的生成 -->
      </select>
    </div>
  </div>

  <div class="form-group">
    <label for="guests">人数 *</label>
    <select id="guests" name="guests" required>
      <option value="">選択</option>
      <option value="1">1名</option>
      <option value="2">2名</option>
      <option value="3">3名</option>
      <option value="4">4名</option>
      <option value="5">5名</option>
      <option value="6+">6名以上（要相談）</option>
    </select>
  </div>

  <div class="form-group">
    <label for="note">ご要望・アレルギー等（任意）</label>
    <textarea id="note" name="note" rows="3"
              placeholder="誕生日席の準備希望、アレルギーなどご記入ください"></textarea>
  </div>

  <!-- 定休日バリデーション注記 -->
  <p class="form-note">※ 月曜日は定休日のため予約できません。<br>
     日曜日は22:00閉店（L.O. 21:30）となります。</p>

  <button type="submit" class="btn-reserve">予約を申し込む</button>
</form>

[定休日・時間バリデーション（JS）]

document.getElementById('date').addEventListener('change', function() {
  const date = new Date(this.value);
  const dayOfWeek = date.getDay(); // 0=日, 1=月

  if (dayOfWeek === 1) { // 月曜
    alert('月曜日は定休日です。他の日をお選びください。');
    this.value = '';
    return;
  }

  // 時間選択肢を曜日別に変える
  const timeSelect = document.getElementById('time');
  timeSelect.innerHTML = '<option value="">選択してください</option>';

  const lastOrder = dayOfWeek === 0 ? '21:30' : '22:30'; // 日曜vs平日
  const times = generateTimes('17:00', lastOrder, 30); // 30分刻み
  times.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    timeSelect.appendChild(opt);
  });
});

function generateTimes(start, end, interval) {
  const times = [];
  let [sh, sm] = start.split(':').map(Number);
  let [eh, em] = end.split(':').map(Number);
  while (sh * 60 + sm <= eh * 60 + em) {
    times.push(`${String(sh).padStart(2,'0')}:${String(sm).padStart(2,'0')}`);
    sm += interval;
    if (sm >= 60) { sm -= 60; sh++; }
  }
  return times;
}

[予約完了後の感謝ページ（thank-you.html）]
- 予約完了メッセージ
- 「電話番号: 099-239-2777」へのtap-to-callリンク
- 「Instagramも見る」→ @yanoji2777 リンク
- 「トップページへ戻る」ボタン
```

---

### ⑥ #gallery — ギャラリー

```
[実装]
- Behold.io グリッドウィジェット
  <behold-widget feed-id="YOUR_FEED_ID" display="grid" columns="3">

- PC: 3列 × 3行（9投稿）
- タブレット: 2列
- モバイル: 2列（スクロールで全表示）

- ホバー演出:
  画像暗転 + ❤️ いいね数 + 投稿日表示
  クリックでInstagram投稿ページへ

[フォールバック（Behold未設定時）]
- assets/images/gallery/ のローカル写真を表示
- data-src を使った Lazy Load 実装

[セクション下部]
「@yanoji2777 フォローはこちら」
→ Instagramアイコン + "Instagram でもっと見る" ボタン
→ https://www.instagram.com/yanoji2777/ へ遷移
```

---

### ⑦ #access — アクセス

```
[レイアウト]
┌──────────────────────────────────────┐
│ ─── アクセス ─────────────────────── │
│                                      │
│  ┌────────────────┐  ┌─────────────┐ │
│  │                │  │ 📍 住所     │ │
│  │  Google Maps   │  │ 〒892-0842  │ │
│  │  iframe        │  │ 鹿児島市    │ │
│  │                │  │ 東千石町    │ │
│  │  （インタラクティブ）│ │ 4-29-63    │ │
│  │                │  │ ビルⅡ 2階 │ │
│  └────────────────┘  │             │ │
│       55%             │ 📞 電話番号 │ │
│                       │ 099-239-2777│ │
│                       │             │ │
│                       │ 🕐 営業時間 │ │
│                       │ 火〜土      │ │
│                       │  17:00-23:00│ │
│                       │ 日         │ │
│                       │  17:00-22:00│ │
│                       │ 月 定休日  │ │
│                       └─────────────┘ │
│                             45%        │
└──────────────────────────────────────┘

[Google Maps埋め込みコード]
<iframe
  src="https://www.google.com/maps/embed/v1/place?
    q=鹿児島県鹿児島市東千石町4-29-63&
    key=AIza..."
  width="100%" height="400"
  style="border:0;" allowfullscreen loading="lazy">
</iframe>

※ Maps Embed API キーが必要（無料枠あり）
  代替: 直接埋め込みURLを使用:
  https://www.google.com/maps?q=鹿児島市東千石町4-29-63&output=embed

[電話リンク]
<a href="tel:0992392777" class="tel-link">
  📞 099-239-2777
</a>

[Instagram リンクバナー]
@ yanoji2777 のバナー → https://www.instagram.com/yanoji2777/
```

---

## 4. 季節自動切替システム（完全版）

```javascript
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 季節設定オブジェクト
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SEASONS = {
  spring: {
    months: [3, 4, 5],
    label: '春', emoji: '🌸',
    color: '#7CB87C',
    bgGradient: 'linear-gradient(135deg, #1A1208, #1a2f1a)',
    particle: '🌸',
    keyword: '春の旬',
    photos: [
      'assets/images/hero/spring/spring-01.jpg',
      'assets/images/hero/spring/spring-02.jpg',
      'assets/images/hero/spring/spring-03.jpg',
    ]
  },
  summer: {
    months: [6, 7, 8],
    label: '夏', emoji: '🍺',
    color: '#2E8B6E',
    bgGradient: 'linear-gradient(135deg, #1A1208, #0a2a2a)',
    particle: '✨',
    keyword: '夏の旬',
    photos: [
      'assets/images/hero/summer/summer-01.jpg',
      'assets/images/hero/summer/summer-02.jpg',
      'assets/images/hero/summer/summer-03.jpg',
    ]
  },
  autumn: {
    months: [9, 10, 11],
    label: '秋', emoji: '🍂',
    color: '#B85C2C',
    bgGradient: 'linear-gradient(135deg, #1A1208, #2a1a08)',
    particle: '🍂',
    keyword: '秋の旬',
    photos: [
      'assets/images/hero/autumn/autumn-01.jpg',
      'assets/images/hero/autumn/autumn-02.jpg',
      'assets/images/hero/autumn/autumn-03.jpg',
    ]
  },
  winter: {
    months: [12, 1, 2],
    label: '冬', emoji: '🍶',
    color: '#4A6FA5',
    bgGradient: 'linear-gradient(135deg, #1A1208, #0a0a2a)',
    particle: '❄️',
    keyword: '冬の旬',
    photos: [
      'assets/images/hero/winter/winter-01.jpg',
      'assets/images/hero/winter/winter-02.jpg',
      'assets/images/hero/winter/winter-03.jpg',
    ]
  }
};

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  return Object.entries(SEASONS)
    .find(([, s]) => s.months.includes(month))[0];
}

function applySeason(seasonKey) {
  const s = SEASONS[seasonKey];
  const root = document.documentElement;
  root.style.setProperty('--season-color', s.color);
  root.style.setProperty('--season-gradient', s.bgGradient);
  document.getElementById('season-badge').textContent =
    `${s.emoji} 今は${s.label}`;
  startSlideshow(s.photos);
  startParticles(s.particle);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  applySeason(getCurrentSeason());
});
```

---

## 5. 予約連携フロー

```
[完全フロー図]

ユーザー
  │
  ▼
HPの予約フォーム入力
（月曜・時間バリデーション）
  │
  ▼
Netlify Forms / Google Forms 送信
  │
  ├── 店主へメール通知（自動）
  │    Subject: 【予約申込】〇月〇日 △名
  │    Body: 名前・電話・日時・人数・要望
  │
  ├── ユーザーへ「受付確認メール」
  │    (Google Forms は自動返信設定可)
  │
  └── 店主がスプレッドシートで確認
       │
       ▼
      確定 or 満席連絡
      （電話 or SMS: 099-239-2777 から）

[注意事項テキスト（フォーム内）]
"※ 予約申込後、店舗より確認の連絡を差し上げます。
   前日までにご連絡がない場合はお電話にてご確認ください。
   当日ご予約は電話（099-239-2777）でお願いします。"
```

---

## 6. ファイル構成（納品）

```
yanoji/                        ← Netlifyにそのままドロップ
├── index.html                 ← 単一ファイル（CSS/JS全内包）
├── thank-you.html             ← 予約完了ページ
├── assets/
│   └── images/
│       ├── hero/
│       │   ├── spring/        ← spring-01〜03.jpg
│       │   ├── summer/        ← summer-01〜03.jpg
│       │   ├── autumn/        ← autumn-01〜03.jpg
│       │   └── winter/        ← winter-01〜03.jpg
│       ├── about/             ← 店内・外観写真
│       ├── menu/              ← 料理写真
│       ├── gallery/           ← ローカルギャラリー写真（Behold代替）
│       └── ogp.jpg            ← SNSシェア用（1200×630px）
├── netlify.toml               ← Netlify設定
└── README.md                  ← 写真差替・Behold設定手順書（店主向け）
```

---

## 7. Cursor 指示プロンプト（そのまま貼り付け用）

```
以下の設計書に基づき、お酒と食彩「家のじ」(ヤノジ) の
Webサイトを作成してください。

━━━ 確定店舗情報 ━━━
店名: お酒と食彩 家のじ（ヤノジ）
住所: 〒892-0842 鹿児島県鹿児島市東千石町4−29−63 ビルⅡ 2階
電話: 099-239-2777
Instagram: @yanoji2777
営業時間: 火〜土 17:00〜23:00 / 日 17:00〜22:00 / 月定休
予算目安: ¥6,000〜¥7,999

━━━ 技術仕様 ━━━
・ファイル: index.html（CSS・JS完全インライン）+ thank-you.html
・外部依存: Google Fonts CDN + Behold.io スクリプトのみ
・ホスティング: Netlify ドロップデプロイ対応
・参考サイト: https://kokuo-demo-20260331.netlify.app/ 同水準

━━━ デザイン ━━━
カラー: 漆黒(#110D07) × 山吹色(#C8781A) × 金(#E8B84B) × 和紙(#F2E8D0)
フォント: Shippori Mincho（見出し）+ Noto Serif JP（本文）
テーマ: 「天文館の2階、灯りが漏れる扉の向こうへ」
雰囲気: 路地裏の隠れ家居酒屋・温かい灯り・旬の食彩

━━━ 必須セクション（上から順） ━━━
1. 固定ナビ（透明→スクロールで不透明、電話番号・予約ボタン）
2. Hero（季節写真スライドショー・季節バッジ・パーティクル演出・2CTAボタン）
3. #season 今の旬（Behold.io Instagram最新投稿 大きく表示・キャプション取得）
4. #about（店主メッセージ・店内写真・3つの特徴アイコン）
5. #menu（タブ切替: 一品料理 / 前菜 / お酒 / 本日のおすすめ）
6. #reservation 予約フォーム（Netlify Forms使用・曜日バリデーション付き）
7. #gallery（Behold.io グリッド3列・Instagram誘導バナー）
8. #access（Google Maps + 営業時間カード + 電話tap-to-callリンク）
9. フッター（店名・住所・電話・Instagram・コピーライト）

━━━ 重要機能詳細 ━━━

【季節自動切替】
const SEASONS = { spring:{months:[3,4,5],...}, summer:..., autumn:..., winter:... }
・月判定で currentSeason を決定
・assets/images/hero/{season}/ から写真ロード
・--season-color CSS変数を動的変更
・季節パーティクル（CSSアニメーション）

【Instagram連携】
・#season: Behold.io single表示 + JSON API でキャプション取得
  fetch('https://feeds.behold.so/BEHOLD_FEED_ID_PLACEHOLDER')
・#gallery: Behold.io grid 3列表示
・Feed ID プレースホルダー: "BEHOLD_FEED_ID_PLACEHOLDER"

【予約フォーム（Netlify Forms）】
<form name="reservation" method="POST" data-netlify="true" action="/thank-you">
フィールド: 名前 / 電話番号 / 来店日（date） / 来店時間（select） / 人数 / 要望
バリデーション:
  ・月曜日選択 → エラー表示「月曜は定休日です」
  ・日曜 → 終了時間を 21:30 L.O. に変更
  ・来店時間は30分刻みで動的生成（17:00〜L.O.時間）

━━━ アニメーション ━━━
・Intersection Observer: data-animate 要素の fade-up
・Hero: クロスフェード（5秒間隔、3秒トランジション）
・ナビ: スクロールで背景透明→不透明
・各CTAボタン: ホバーで scale(1.03) + glow 効果

━━━ レスポンシブ ━━━
モバイルファースト、ブレークポイント 768px / 1200px
Season・About・Access: PC=2カラム → モバイル=縦積み
Gallery: PC=3列 → モバイル=2列
```

---

## 8. 写真素材 依頼リスト（店主宛）

```
■ 優先度HIGH（サイト公開に必須）
□ 外観・看板（夜、灯りが見える）    2〜3枚  ← HP顔になる最重要
□ 店内（全体・カウンター）          2〜3枚
□ 料理写真（現在の看板メニュー）    10枚以上

■ 優先度MIDDLE（あると良い）
□ 外観（昼）                       1〜2枚
□ ドリンク（焼酎・ビール等）       3〜5枚
□ 店主の写真（About用）            1〜2枚
□ 季節ごとの料理                   季節×3枚

■ 写真規格
・Hero背景用: 1920×1080px以上 / 横長 / 500KB以下
・料理・ドリンク: 800×800px以上 / 正方形か4:3 / 300KB以下
・フォーマット: JPG（WebP変換はCursorで対応可）

■ 暫定対応（写真未入稿時）
・Unsplash等のフリー素材で仮組みし、
  写真入稿後に差し替え
```

---

## 9. Behold.io セットアップ（店主向け手順）

```
【Instagram連携 設定手順】

Step 1: アカウント作成
  → https://behold.so にアクセス
  → 「Get Started Free」でアカウント作成

Step 2: Instagram連携
  → 「Create New Feed」をクリック
  → @yanoji2777 のInstagramでログイン
  → アクセス許可を承認

Step 3: Feed ID 取得
  → Feed作成後に表示される ID をコピー
  例: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"

Step 4: HPに設定（Panther担当）
  → 設計書の "BEHOLD_FEED_ID_PLACEHOLDER" を
    取得したIDに置き換えてNetlifyに再デプロイ

【以降の運用】
Instagramに投稿するだけで自動更新！
設定変更不要・追加費用なし（無料プラン）
```

---

## 10. 開発スケジュール

```
Phase 1 [Day 1]  基盤構築
  ✓ HTML骨格 + CSSリセット + デザインシステム変数
  ✓ フォント・カラーパレット・レスポンシブグリッド
  ✓ ナビゲーション（スクロール変化）

Phase 2 [Day 2]  Hero + Season
  ✓ Hero スライドショー + 季節切替 + パーティクル
  ✓ Season セクション + Behold.io 連携

Phase 3 [Day 3]  About + Menu
  ✓ About セクション（写真・テキスト・アイコン）
  ✓ Menu タブ切替 + JSONデータ構造

Phase 4 [Day 4]  予約フォーム ★
  ✓ Netlify Forms 実装
  ✓ 月曜バリデーション + 時間動的生成
  ✓ thank-you.html 作成

Phase 5 [Day 5]  Gallery + Access + Footer
  ✓ Behold.io グリッドウィジェット
  ✓ Google Maps 埋め込み + 営業時間カード
  ✓ フッター

Phase 6 [Day 6]  アニメーション + 仕上げ
  ✓ Intersection Observer 全セクション適用
  ✓ パーティクル演出 polish
  ✓ SEO/OGP meta タグ
  ✓ 写真 Lazy Load

Phase 7 [Day 7]  テスト + 納品
  ✓ モバイル全画面確認
  ✓ Netlify デプロイ + Forms テスト送信
  ✓ 写真差替手順書 README.md 完成
```

---

## 11. SEO / OGP 設定

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>お酒と食彩 家のじ（ヤノジ）| 鹿児島天文館の隠れ家居酒屋</title>
  <meta name="description"
    content="鹿児島天文館、東千石町の2階にある隠れ家居酒屋「家のじ」。
    旬の食材を活かした一品料理と厳選したお酒を。
    毎日更新のInstagram(@yanoji2777)で今日の旬をチェック！
    ご予約はWebまたはお電話(099-239-2777)で。火〜土 17:00〜23:00。">
  <meta name="keywords"
    content="家のじ, ヤノジ, 鹿児島, 天文館, 居酒屋, 食彩, 隠れ家,
    旬, 東千石町, 鹿児島グルメ, 天文館通, 鹿児島市">

  <!-- OGP -->
  <meta property="og:title" content="お酒と食彩 家のじ | 鹿児島天文館">
  <meta property="og:description"
    content="天文館の2階、灯りが漏れる扉の向こうへ。旬の食彩とお酒の場。">
  <meta property="og:image" content="assets/images/ogp.jpg">
  <meta property="og:type" content="restaurant">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:url" content="https://yanoji.netlify.app/">

  <!-- 構造化データ（JSON-LD） -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "お酒と食彩 家のじ",
    "alternateName": "ヤノジ",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "東千石町4-29-63 ビルⅡ 2階",
      "addressLocality": "鹿児島市",
      "addressRegion": "鹿児島県",
      "postalCode": "892-0842",
      "addressCountry": "JP"
    },
    "telephone": "099-239-2777",
    "openingHours": [
      "Tu-Sa 17:00-23:00",
      "Su 17:00-22:00"
    ],
    "servesCuisine": "Japanese",
    "priceRange": "¥¥¥",
    "sameAs": "https://www.instagram.com/yanoji2777/"
  }
  </script>
</head>
```

---

*設計書 ver 2.0 / 更新日: 2026-04-20*
*次のステップ: 写真素材受領 → Behold.io Feed ID 取得 → Cursor実装開始*
*担当: Panther AI Consulting*
