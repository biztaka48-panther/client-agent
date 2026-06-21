@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"

set "PORT=3010"
if not "%~1"=="" set "PORT=%~1"

title sunplusone HTTP %PORT%

echo.
echo ============================================================
echo   表示URL:  http://127.0.0.1:%PORT%/
echo            http://localhost:%PORT%/
echo ============================================================
echo 止める: Ctrl+C またはこのウィンドウを閉じる
echo.

rem 1) Python ランチャー
where py >nul 2>&1
if not errorlevel 1 (
  py -3 -m http.server %PORT%
  if errorlevel 1 (
    echo.
    echo [エラー] py -3 -m http.server が失敗しました（ポート使用中など）。
    pause
  )
  exit /b 0
)

rem 2) PATH の python
where python >nul 2>&1
if not errorlevel 1 (
  python -m http.server %PORT%
  if errorlevel 1 (
    echo.
    echo [エラー] python -m http.server が失敗しました（ポート使用中など）。
    pause
  )
  exit /b 0
)

rem 3) インストール直後で PATH がまだ効いていない場合の定番パス
for %%F in (
  "%LocalAppData%\Programs\Python\Python313\python.exe"
  "%LocalAppData%\Programs\Python\Python312\python.exe"
  "%LocalAppData%\Programs\Python\Python311\python.exe"
  "%LocalAppData%\Programs\Python\Python310\python.exe"
) do if exist "%%~F" (
  echo [ヒント] PATH に無いが実体を検出: %%~F
  "%%~F" -m http.server %PORT%
  if errorlevel 1 (
    echo.
    echo [エラー] http.server 起動失敗（ポート使用中など）。
    pause
  )
  exit /b 0
)

echo [NG] Python ^(py / python^) が見つかりません。
echo  - install-python.cmd を実行する（winget）
echo  - または https://www.python.org/downloads/ から導入し、**新しい**コマンド画面で preview.cmd
echo  - インストール時「Add python.exe to PATH」にチェック推奨
pause
exit /b 1
