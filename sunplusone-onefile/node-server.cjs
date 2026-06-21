/**
 * Node 標準モジュールだけで動く静的ファイルサーバー（外部依存ゼロ）。
 * 用途: Python なしでも `node node-server.cjs [port]` でローカル表示。
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = Number(process.argv[2] || process.env.PORT || 3010);
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".cjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function safeJoin(root, reqPath) {
  const decoded = decodeURIComponent(reqPath.split("?")[0]);
  const target = path.normalize(path.join(root, decoded));
  if (!target.startsWith(root)) return null;
  return target;
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let target = safeJoin(ROOT, parsed.pathname || "/");
  if (!target) {
    res.writeHead(400);
    return res.end("Bad path");
  }
  fs.stat(target, (err, stat) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 Not Found: " + req.url);
    }
    if (stat.isDirectory()) target = path.join(target, "index.html");
    fs.readFile(target, (e, data) => {
      if (e) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("404 Not Found: " + req.url);
      }
      const ext = path.extname(target).toLowerCase();
      const ctype = TYPES[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": ctype });
      res.end(data);
    });
  });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`[NG] ポート ${PORT} は使用中です。preview.cmd は自動で別ポートを試します。`);
  } else {
    console.error("[NG]", err.message);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log("============================================================");
  console.log(`  表示URL:  http://127.0.0.1:${PORT}/`);
  console.log(`           http://localhost:${PORT}/`);
  console.log("============================================================");
  console.log("止める: Ctrl+C またはこのウィンドウを閉じる");
});
