@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"
if not exist "index.html" (
  echo index.html が見つかりません。
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   サンプラスワン単一HTML — ローカルプレビュー
echo ============================================================
echo.

rem 空いているポートを探す
set "PORT="
for %%P in (3010 3011 5500 8765) do (
  netstat -ano 2>nul | findstr ":%%P " | findstr "LISTENING" >nul
  if errorlevel 1 (
    if not defined PORT set "PORT=%%P"
  )
)
if not defined PORT set "PORT=3010"

echo 使うポート: !PORT!  （3010が埋まっている場合は自動でずらします）
echo 迷ったら verify-env.cmd で Python / Node を確認できます。
echo.

rem Python 実体: PATH または python.org 既定の install 先
set "HAS_PY=0"
where py >nul 2>&1 && set "HAS_PY=1"
if "!HAS_PY!"=="0" (
  where python >nul 2>&1 && set "HAS_PY=1"
)
if "!HAS_PY!"=="0" (
  for %%F in (
    "%LocalAppData%\Programs\Python\Python313\python.exe"
    "%LocalAppData%\Programs\Python\Python312\python.exe"
    "%LocalAppData%\Programs\Python\Python311\python.exe"
    "%LocalAppData%\Programs\Python\Python310\python.exe"
  ) do if exist "%%~F" set "HAS_PY=1"
)

if "!HAS_PY!"=="1" goto SERVE_PYTHON

where node >nul 2>&1
if not errorlevel 1 goto SERVE_NODE

echo [ヒント] Python も Node も見つかりません。
echo   1^) install-python.cmd を実行（winget で Python 3.12）
echo   2^) 終了後に **新しい** ウィンドウで verify-env.cmd → preview.cmd
echo   3^) 当面は open-index.cmd で file:// 表示も可
echo.
start "" "%cd%\index.html"
pause
exit /b 1

:SERVE_PYTHON
start "sunplusone-server-!PORT!" /D "%~dp0." cmd /k call "%~dp0server-mini.cmd" !PORT!
goto OPEN_BROWSER

:SERVE_NODE
echo Node の軽量サーバー（node-server.cjs）を別ウィンドウで起動します...
start "sunplusone-server-!PORT!" /D "%~dp0." cmd /k "node "%~dp0node-server.cjs" !PORT!"

:OPEN_BROWSER
echo サーバーの準備を待っています（4秒）...
timeout /t 4 /nobreak >nul

start "" "http://localhost:!PORT!/"

echo.
echo ブラウザで開いたアドレス:  http://localhost:!PORT!/
echo うまくいかないとき:
echo   1^) 「sunplusone-server-!PORT!」ウィンドウのエラーを確認
echo   2^) 上のURLを手で貼り付け
echo   3^) Python 導入直後は **一度ターミナルを閉じて** preview.cmd をやり直し（PATH 更新）
echo.
pause
exit /b 0
