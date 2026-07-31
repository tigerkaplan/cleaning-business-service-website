@echo off
cd /d "%~dp0"

echo Starting local cleaning website...
echo.

if not exist node_modules (
  echo Installing dependencies first...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Dependency install failed.
    pause
    exit /b 1
  )
)

call npm.cmd run dev

echo.
echo Dev server stopped.
pause
