@echo off
REM ===========================================
REM Birthday Tracker – Start Backend & Frontend
REM ===========================================

echo ============================
echo Starting Backend (Quarkus)...
echo ============================
start cmd /k "cd backend && mvnw quarkus:dev -Dquarkus.http.port=8080" 

echo ============================
echo Starting Frontend (React/Vite)...
echo ============================
start cmd /k "cd frontend && npm install && npm run dev -- --port=5174"

echo ===================================================
echo Backend and Frontend should now be running
echo Check the separate windows for logs
echo ===================================================
pause
