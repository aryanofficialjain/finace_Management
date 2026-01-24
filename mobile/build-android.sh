#!/bin/bash

# Set environment variables for Android signing
export ANDROID_KEYSTORE_PATH="./fintask.keystore"
export ANDROID_KEYSTORE_ALIAS="fintask"
export ANDROID_KEYSTORE_PASSWORD=""
export ANDROID_KEY_PASSWORD=""

# Run the build
eas build --platform android --profile production --local
