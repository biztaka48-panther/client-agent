@echo off
chcp 65001 >nul
set "SRC=%~dp0public\images"
set "DST=%~dp0images"
if not exist "%DST%" mkdir "%DST%"

echo public\images から images\ へ同期します...
echo.

if not exist "%SRC%\logo.png" (
  echo [NG] %SRC%\logo.png がありません。
  pause
  exit /b 1
)

copy /Y "%SRC%\logo.png" "%DST%\logo.png" >nul
if exist "%SRC%\logo.svg" copy /Y "%SRC%\logo.svg" "%DST%\logo.svg" >nul

echo [OK] logo.png を %DST%\ にコピーしました。
echo.
echo 次: git add images/logo.png  ^&^& git commit -m "Update company logo"  ^&^& git push
pause
exit /b 0
