@echo off
REM ===========================================
REM Birthday Tracker – Start Backend & Frontend
REM ===========================================

echo ============================
echo Starting Backend (Quarkus)...
echo ============================
start cmd /k "cd backend && mvn quarkus:dev" 

echo ============================
echo Starting Frontend (React/Vite)...
echo ============================
start cmd /k "cd frontend && npm install && npm run dev"

echo ===================================================
echo Backend and Frontend should now be running
echo Check the separate windows for logs
echo ===================================================
pause