@echo off
chcp 65001 >nul
set "DST=%~dp0images\sakurajima.png.jpg"
if not exist "%~dp0images\" mkdir "%~dp0images\"

if exist "%DST%" (
  echo [OK] 既に %DST% があります。
  goto OK
)
if exist "%~dp0images\sakurajima.png.jpg.jpg" (
  echo 誤名 sakurajima.png.jpg.jpg を正規名へリネームします...
  move /Y "%~dp0images\sakurajima.png.jpg.jpg" "%DST%"
  if exist "%DST%" goto OK
)

echo 桜島画像を images\sakurajima.png.jpg へコピーします...
echo.

if exist "C:\dev\sunplusone-onefile\images\sakurajima.png.jpg" (
  copy /Y "C:\dev\sunplusone-onefile\images\sakurajima.png.jpg" "%DST%" && goto OK
)
if exist "%USERPROFILE%\OneDrive\Desktop\client-agent\sunplusone-onefile\images\sakurajima.png.jpg" (
  copy /Y "%USERPROFILE%\OneDrive\Desktop\client-agent\sunplusone-onefile\images\sakurajima.png.jpg" "%DST%" && goto OK
)
if exist "%USERPROFILE%\OneDrive\Desktop\client-agent\sunplusone-onefile\images\sakurajima.jpg" (
  copy /Y "%USERPROFILE%\OneDrive\Desktop\client-agent\sunplusone-onefile\images\sakurajima.jpg" "%DST%" && goto OK
)

echo [NG] コピー元が見つかりません。エクスプローラーで sakurajima の写真を
echo     %DST%
echo     に手動コピーしてください（ファイル名は sakurajima.png.jpg 推奨）。
pause
exit /b 1

:OK
echo [OK] %DST%
echo.
echo 次: Git なら  git add images/sakurajima.png.jpg  ^&^& git commit -m "Add hero sakurajima"  ^&^& git push
echo     ZIPデプロイなら、この images フォルダごと再アップロードしてください。
pause
exit /b 0
