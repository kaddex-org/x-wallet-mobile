#!/usr/bin/env bash

export VERSION_NAME=$(jq -r ".version" package.json)

if [ -z "$VERSION_NAME" ]
then
    echo "You need define the VERSION_NAME variable in App Center"
    exit 1
fi

IOS_PROJECT_NAME=kadena
# echo $DOT_ENV | base64 -d > .env

if [ $APPCENTER_PLATFORM = "android" ]
then
    # echo $GOOGLE_SERVICES | base64 -d > android/app/google-services.json

    ANDROID_BUILD_GRADLE=$APPCENTER_SOURCE_DIRECTORY/android/app/build.gradle
    if [ -e "$ANDROID_BUILD_GRADLE" ]
    then
        echo "Updating version code to $APPCENTER_BUILD_ID in build.gradle"
        sed -i '' 's/versionCode [0-9]*/versionCode '$APPCENTER_BUILD_ID'/' $ANDROID_BUILD_GRADLE
        echo "Updating version name to $VERSION_NAME in build.gradle"
        sed -i '' 's/versionName "[0-9.]*"/versionName "'$VERSION_NAME'"/' $ANDROID_BUILD_GRADLE
        echo "File content:"
        cat $ANDROID_BUILD_GRADLE
    fi
fi

if [ $APPCENTER_PLATFORM = "ios" ]
then
    # echo $GOOGLE_SERVICES | base64 -d > ios/GoogleService-Info.plist

    INFO_PLIST_FILE=$APPCENTER_SOURCE_DIRECTORY/ios/$IOS_PROJECT_NAME/Info.plist
    if [ -e "$INFO_PLIST_FILE" ]
    then
        echo "Updating version name to $VERSION_NAME in Info.plist"
        plutil -replace CFBundleShortVersionString -string $VERSION_NAME $INFO_PLIST_FILE

        echo "File content:"
        cat $INFO_PLIST_FILE
    fi
fi

if [ $APPCENTER_PLATFORM = "android" ]
then
npx jetify
fi

if [ $APPCENTER_PLATFORM = "ios" ]
then
rm -rf $APPCENTER_SOURCE_DIRECTORY/ios/Pods
cd $APPCENTER_SOURCE_DIRECTORY/ios
pod update
cd ..
fi