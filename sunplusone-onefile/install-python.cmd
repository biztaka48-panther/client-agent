@echo off
chcp 65001 >nul
echo.
echo Python 3.12 を winget で入れます（管理者や UAC 確認が出ることがあります）。
echo 完了したら **いったんこの画面を閉じ**、**新しく**コマンドプロンプトを開いて verify-env.cmd → preview.cmd の順で試してください。
echo （PATH が更新されないと「入れたのに見つからない」になります）
echo.
pause

where winget >nul 2>&1
if errorlevel 1 (
  echo winget が使えません。ブラウザで https://www.python.org/downloads/ から Windows 用インストーラを取得してください。
  pause
  exit /b 1
)

winget install -e --id Python.Python.3.12 --accept-package-agreements --accept-source-agreements
echo.
echo winget 終了コード: %errorlevel%
echo 失敗した場合は python.org のインストーラを使用してください。
pause
