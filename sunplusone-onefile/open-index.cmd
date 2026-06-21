@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "index.html" (
  echo index.html が見つかりません。この .cmd と同じフォルダに置いてください。
  pause
  exit /b 1
)

rem 既定の関連付けで開く
start "" "%cd%\index.html"
if %errorlevel% equ 0 exit /b 0

rem 関連付けが無い環境向けフォールバック
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Start-Process -FilePath (Resolve-Path -LiteralPath '.\index.html').Path } catch { Write-Host $_; exit 1 }"
if %errorlevel% neq 0 (
  echo ブラウザで開けませんでした。index.html をエクスプローラーからドラッグ＆ドロップするか、preview.cmd で http://127.0.0.1:3010/ を試してください。
  pause
  exit /b 1
)
