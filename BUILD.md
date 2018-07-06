## Build

1. Install [Android Studio](https://developer.android.com/studio/)

1. Activate [Developer Mode](https://developer.android.com/studio/debug/dev-options)  on your device

1. Install [Gradle](https://gradle.org/) (With linux) :

    ```
    sudo apt-get install gradle
    ```

1. In package.json, inside "scripts" tag, add :
    ```
    "cordova": "node_modules/.bin/cordova",
    "android-remote": "phonegap remote build android",
    "android-local": "cordova run android --device"
    ```

1. Inside config.xml change :
    ```
    <preference name="android-minSdkVersion" value="14" />
    ```
    into :
    ```
    <preference name="android-minSdkVersion" value="16" />
    ```

1. Let's check if cordova is OK:
    ```
    npm run cordova platform ls
    ```
    The response must look like :
    ```
    Installed platforms:
    android 7.0.0
    browser 5.0.3
    Available platforms:
    ios ~4.5.4
    osx ~4.0.1
    windows ~5.0.0
    www ^3.12.0
    ```

1. Add whitelist and diagnostic plugins
    ```
    cordova plugin add cordova.plugins.diagnostic
    cordova plugin add cordova-plugin-whitelist
    ```
1. Add your environment variables in /etc/environment
    ```
    PATH="path/to/android/sdk/tools:path/to/android/sdk/platform-tools"    
    ANDROID_HOME=/path/to/android/sdk
    ```
1. Plug-in your device

1. Execute build command
    ```
    npm run android-local
    ```