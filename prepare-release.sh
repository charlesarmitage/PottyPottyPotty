#!/bin/bash
if [ -z $1 ]; then 
	echo usage: $0 "<keystore-password>"
	echo
	echo "Signs & zips ./PottyPottyPotty-release-unsigned.apk to PottyPottyPotty.apk"
	echo "Using: ./pottypottypotty-release.keystore"
    exit
    fi
KEY_PASS=$1

KEYSTORE=pottypottypotty-release.keystore
UNSIGNED_APK=builds/android/pottypottypotty-release-unsigned.apk
SIGNED_APK=builds/android/pottypottypotty.apk

echo "Sign apk"

jarsigner \
	-sigalg SHA1withRSA \
	-digestalg SHA1 \
	-keystore $KEYSTORE \
	$UNSIGNED_APK \
	pottypottypotty \
	--storepass $1

echo "Zip align apk"

~/Android/Sdk/build-tools/22.0.1/zipalign 4 $UNSIGNED_APK $SIGNED_APK

echo "Done"
