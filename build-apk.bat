@echo off
echo ========================================
echo Cursed Mind - APK Build Script
echo ========================================
echo.

REM Check Java
echo Checking Java installation...
java -version 2>&1
if errorlevel 1 (
    echo ERROR: Java not found. Please install Java JDK 17 and set JAVA_HOME.
    pause
    exit /b 1
)

REM Check Android SDK
echo.
echo Checking Android SDK...
if not defined ANDROID_HOME (
    echo WARNING: ANDROID_HOME not set. Attempting to find Android SDK...
    if exist "%LOCALAPPDATA%\Android\Sdk" (
        set ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk
        echo Found Android SDK at %ANDROID_HOME%
    ) else (
        echo ERROR: Android SDK not found. Please install Android Studio or SDK.
        pause
        exit /b 1
    )
)

REM Navigate to cordova-app directory
cd "C:\Users\Administrator\Documents\Curse Mind - Copy\cordova-app"

REM Clean previous builds
echo.
echo Cleaning previous builds...
cordova clean android

REM Build the APK
echo.
echo Building Android APK (this may take several minutes)...
cordova build android --release

if errorlevel 1 (
    echo.
    echo ERROR: Build failed. Check the output above for details.
    pause
    exit /b 1
)

echo.
echo ========================================
echo BUILD SUCCESSFUL!
echo ========================================
echo.
echo APK location:
echo C:\Users\Administrator\Documents\Curse Mind - Copy\cordova-app\platforms\android\app\build\outputs\apk\release\
echo.
echo Note: The APK is unsigned. To sign it for Play Store release,
echo you'll need to create a keystore and sign the APK.
echo.
pause
