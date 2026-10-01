@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22 LTS, then run this file again.
  pause
  exit /b 1
)
if not exist .env.local copy .env.example .env.local >nul
if not exist node_modules (
  call npm ci
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Open http://localhost:3000 after the server is ready.
echo Configure SMTP_PASS in .env.local to enable email delivery.
call npm run dev
pause
