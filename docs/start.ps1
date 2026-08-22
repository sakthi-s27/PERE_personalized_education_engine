Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   PERE - Personalized Education Reasoning Engine" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "Starting local web server..." -ForegroundColor Green

$nodePath = "C:\Users\Kamali\AppData\Local\ms-playwright-go\1.50.1\node.exe"

if (Test-Path $nodePath) {
    Write-Host "Launching Express server on http://localhost:3000..." -ForegroundColor Yellow
    & $nodePath server.js
} else {
    Write-Host "Launching Python web server on http://localhost:3000..." -ForegroundColor Yellow
    python -m http.server 3000
}
