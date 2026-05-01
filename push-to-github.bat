@echo off
echo ========================================
echo Cursed Mind - Git Push Script
echo ========================================
echo.

cd "C:\Users\Administrator\Documents\Curse Mind - Copy"

REM Initialize git repo if not already done
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
)

REM Add all files
echo.
echo Adding files to Git...
git add .

REM Commit
echo.
echo Creating commit...
git commit -m "Initial commit: Cursed Mind Android app with Cordova"

REM Add remote
echo.
echo Adding GitHub remote...
git remote -v | find "origin" > nul
if errorlevel 1 (
    git remote add origin https://github.com/ashuri-17/maliga_F1.git
) else (
    echo Remote origin already exists.
)

REM Push to GitHub
echo.
echo Pushing to GitHub...
echo NOTE: You may be prompted to enter your GitHub credentials.
git push -u origin main

if errorlevel 1 (
    echo.
    echo Push failed. You may need to:
    echo 1. Check your GitHub credentials
    echo 2. Create the repository at https://github.com/ashuri-17/maliga_F1
    echo 3. Use SSH instead of HTTPS
    echo.
    echo Trying to create repo via gh CLI...
    gh repo create ashuri-17/maliga_F1 --public --push
)

echo.
echo Done!
pause
