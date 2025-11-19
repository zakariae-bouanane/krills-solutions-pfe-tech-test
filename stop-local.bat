@echo off
echo Stopping Quarkus + React...

:: Kill Quarkus (Dev Mode)
taskkill /F /IM java.exe >nul 2>&1

:: Kill React dev server (port 5174)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5174') do taskkill /PID %%a /F >nul 2>&1

echo Done.
pause
