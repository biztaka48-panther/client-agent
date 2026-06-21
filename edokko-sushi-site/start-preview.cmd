@echo off
chcp 65001 >nul
cd /d "%~dp0"

set PORT=18080

echo.
echo ========================================
echo  江戸っ子寿司サイト - ローカルプレビュー
echo ========================================
echo.
echo 次のURLをブラウザで開いてください（サーバー起動後）:
echo   http://127.0.0.1:%PORT%/
echo   または  http://localhost:%PORT%/
echo.
echo 【重要】この黒い画面は閉じないでください。閉じるとサイトに接続できません。
echo 終了するときはこの画面で Ctrl+C を押してください。
echo.

python -m http.server %PORT% --bind 127.0.0.1
if errorlevel 1 (
  echo.
  echo --- Python で起動できませんでした ---
  echo ・Python が入っているか: コマンドで python --version を確認
  echo ・ポート %PORT% が使用中の場合: このファイルをメモ帳で開き PORT= を 28080 などに変更
  echo.
  pause
)
