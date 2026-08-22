@echo off
echo =========================================================
echo    PERE - Personalized Education Reasoning Engine
echo =========================================================
echo Starting local web server...

if exist "C:\Users\Kamali\AppData\Local\ms-playwright-go\1.50.1\node.exe" (
    echo Launching Node Express server via Playwright Node...
    "C:\Users\Kamali\AppData\Local\ms-playwright-go\1.50.1\node.exe" server.js
) else (
    echo Launching Python HTTP server...
    python -m http.server 3000
)

pause
