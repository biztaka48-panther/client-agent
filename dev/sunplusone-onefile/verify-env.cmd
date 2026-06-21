@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ========== sunplusone-onefile / 環境チェック ==========
echo.

echo [1] PATH 上の py / python
where py 2>nul
if errorlevel 1 echo   （py ランチャー: 見つかりません）
where python 2>nul
if errorlevel 1 echo   （python コマンド: 見つかりません）
echo.
echo [2] バージョン（成功したものだけ表示）
py -3 --version 2>nul
python --version 2>nul
echo.
echo [3] よくあるインストール先（実体ファイル）
setlocal EnableDelayedExpansion
for %%F in (
  "%LocalAppData%\Programs\Python\Python313\python.exe"
  "%LocalAppData%\Programs\Python\Python312\python.exe"
  "%LocalAppData%\Programs\Python\Python311\python.exe"
  "%LocalAppData%\Programs\Python\Python310\python.exe"
) do if exist "%%~F" echo   あり: %%~F
endlocal
echo.
echo [4] Node.js（npx プレビュー用）
where node 2>nul
if errorlevel 1 echo   （node: 見つかりません） else node -v
echo.
echo [5] 次の操作
echo   - すべて OK なら preview.cmd をダブルクリック
echo   - Python だけ無い場合 install-python.cmd を実行 そのあと新しいコマンド画面で preview.cmd
echo   - Node だけある場合 このフォルダで npm run preview
echo.
pause
