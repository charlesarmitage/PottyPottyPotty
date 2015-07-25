#!/bin/bash
if [ -z $1 ]; then 
	echo usage: $0 "<keystore-password>"
	echo
	echo "Signs & zips ./PottyPottyPotty-release-unsigned.apk to PottyPottyPotty.apk"
	echo "Using: ./pottypottypotty-release.keystore"
    exit
    fi
KEY_PASS=$1

echo "Sign apk"

jarsigner \
	-sigalg SHA1withRSA \
	-digestalg SHA1 \
	-keystore pottypottypotty-release.keystore \
	PottyPottyPotty-release-unsigned.apk \
	pottypottypotty \
	--storepass $1

echo "Zip align apk"

~/Android/Sdk/build-tools/22.0.1/zipalign 4 PottyPottyPotty-release-unsigned.apk PottyPottyPotty.apk

echo "Done"
